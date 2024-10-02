"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/PageLoader";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // For admin email
  const [token, setToken] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentDetails, setAgentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        email,
        password,
      });
      const { token } = response.data;

      localStorage.setItem("token", token); // Store token in local storage
      setToken(token);
      setIsLoggedIn(true);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setPassword("");
    setEmail("");
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchAgents();
    }
  }, [isLoggedIn, token]);

  const fetchAgents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/admin/agents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error("Failed to fetch agents. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAgentDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgentDetails(response.data);
    } catch (error) {
      console.error("Error fetching agent details:", error);
      toast.error("Failed to fetch agent details. Please try again.");
    }
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    fetchAgentDetails(agent.id);
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedAgent) return;

    setIsUpdating(true);
    try {
      await axios.put(
        `${API_URL}/api/admin/verification/${selectedAgent.id}`,
        { verificationStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgents(
        agents.map((agent) =>
          agent.id === selectedAgent.id
            ? { ...agent, verificationStatus: newStatus }
            : agent
        )
      );
      setSelectedAgent((prev) =>
        prev ? { ...prev, verificationStatus: newStatus } : null
      );
      toast.success("Agent status updated successfully.");
    } catch (error) {
      console.error("Error updating agent status:", error);
      toast.error("Failed to update agent status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="p-8 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-4 text-2xl font-bold">Admin Login</h2>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="container mx-auto p-4 px-4 md:px-16 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Dashboard (Agents)</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="h-screen overflow-auto">
        {agents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow
                  key={agent.id}
                  onClick={() => handleAgentClick(agent)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{agent.fullName}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        agent.verificationStatus === "approved"
                          ? "default"
                          : agent.verificationStatus === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {agent.verificationStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No agents available
          </div>
        )}
      </div>

      {selectedAgent && agentDetails && (
        <Dialog
          open={!!selectedAgent}
          onOpenChange={() => setSelectedAgent(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Agent Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={agentDetails.fullName} readOnly />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={agentDetails.email} readOnly />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) => handleStatusChange(value)}
                  defaultValue={selectedAgent.verificationStatus}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="verificationImage">
                  Verification Document
                </Label>
                <div className="border rounded-lg p-4">
                  <img
                    src={agentDetails.verificationImage}
                    alt="Verification Document"
                    className="w-full h-[150px] max-h-64 object-contain"
                  />
                  <a
                    href={agentDetails.verificationImage}
                    download="verification_document.jpg"
                    target="_blank"
                  >
                    <Button>Download Full Image</Button>
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
