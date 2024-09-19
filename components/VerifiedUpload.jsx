"use client";

import axios from "axios";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Upload, Loader2 } from "lucide-react";
import AuthContext from "@/context/AuthContext";
import toast from "react-hot-toast";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export default function VerifiedUpload() {
  const router = useRouter();
  const { user, updateUser } = useContext(AuthContext);
  const userId = user?.id;
  const [uploading, setUploading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [formData, setFormData] = useState({ avatar: "" });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showMismatchDialog, setShowMismatchDialog] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result?.toString().split(",")[1];
      if (!base64Image) {
        toast.error("Failed to read the image file.");
        setUploading(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "bxmkzdav");

        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => Math.min(prev + 10, 90));
        }, 200);

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dvvirefzi/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (!res.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const fileData = await res.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: fileData.secure_url,
        }));

        setDetecting(true);
        const detectedName = await extractTextFromImage(base64Image);

        const normalizedDetectedName = detectedName?.toLowerCase().trim();
        const normalizedUserName = user.fullName?.toLowerCase().trim();

        if (
          normalizedDetectedName &&
          normalizedDetectedName.includes(normalizedUserName)
        ) {
          console.log("Successfully detected the user name.");
          toast.success("Detected name matches your username!");

          await verifyAgent(fileData.secure_url);
        } else {
          setShowMismatchDialog(true);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
      } finally {
        setUploading(false);
        setDetecting(false);
      }
    };
  };

  const extractTextFromImage = async (base64Image) => {
    const API_KEY = "AIzaSyC8R1JRC2s2quciVEE29OzGOMig-tPGsBw";
    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "TEXT_DETECTION",
                },
              ],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to extract text from image");
    }

    const data = await res.json();
    const extractedText =
      data.responses[0]?.textAnnotations[0]?.description || null;

    return extractedText;
  };

  const verifyAgent = async (imageUrl) => {
    try {
      const response = await axios.put(`${API_URL}/api/user/verify/agent`, {
        userId,
        imageUrl,
      });
      console.log("User data:", response);

      if (response.status === 200) {
        updateUser(response.data.user);
        router.push("/my-listings");
      }
    } catch (error) {
      console.error("Error verifying agent:", error);
      toast.error("Error verifying agent.");
    }
  };

  const handleCancel = () => {
    setShowMismatchDialog(false);
    window.location.reload();
  };

  const handleGoToProfile = () => {
    setShowMismatchDialog(false);
    router.push("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 h-screen relative">
      <Card className="w-full max-w-md mx-auto mt-20">
        <CardHeader>
          <CardTitle>Agent ID Verification (NIN)</CardTitle>
          <CardDescription>
            Upload an image of your NIN for verification of agent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="imageUpload">Image</Label>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading || detecting}
              />
            </div>
            {uploading && (
              <div className="space-y-2">
                <Label>Uploading</Label>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
            {formData.avatar && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 border rounded-md overflow-hidden">
                  <img
                    src={formData.avatar}
                    alt="Uploaded Avatar"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            onClick={() => document.getElementById("imageUpload")?.click()}
            disabled={uploading || detecting}
          >
            {uploading || detecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploading ? "Uploading" : "Detecting"}
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      {(uploading || detecting) && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm font-medium">
              {uploading ? "Uploading..." : "Verifying..."}
            </p>
          </div>
        </div>
      )}
      <Dialog open={showMismatchDialog} onOpenChange={setShowMismatchDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Name Mismatch</DialogTitle>
            <DialogDescription>
              The name detected in the document doesn't match the full name you
              provided during sign up. Please update your credentials in your
              profile or upload another document.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleGoToProfile}>Go to Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
