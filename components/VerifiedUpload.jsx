import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GoogleGenerativeAI } from "@google/generative-ai";


const MyImageUploadComponent = () => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ avatar: '' });

  const API_KEY = "YOUR_GOOGLE_GENAI_API_KEY"; 
  const genAI = new GoogleGenerativeAI(API_KEY);

  const sampleUserName = "John Doe"; 

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bxmkzdav");

    try {
      // Upload to Cloudinary
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvvirefzi/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const fileData = await res.json();

      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: fileData.secure_url,
      }));

      toast.success("Image uploaded successfully!");

      // Call Gemini API for name extraction
      const imageUrl = fileData.secure_url;  // Use the uploaded image URL

      const detectedName = await scanImageWithGemini(imageUrl);

      if (detectedName && detectedName === sampleUserName) {
        console.log("Successfully detected the sample user name.");
        toast.success("Detected name matches the sample username!");
      } else {
        toast.warning("Name detected but does not match the sample username.");
      }

    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const scanImageWithGemini = async (base64Image) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 64,
      responseMimeType: "text/plain",
    };

    try {
      const chatSession = await model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: `You will be provided with an image. Please scan it for any names.` }],
            inline_data: {
              mime_type: "image/png",
              data: base64Image,  
            },
          },
        ],
      });

      return chatSession.response.text();  s

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 h-screen">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-5">
        <h2 className="text-lg font-semibold text-center mb-4">Upload Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border w-full p-2 rounded-md mb-4"
          disabled={uploading}
        />

        {uploading ? (
          <p className="text-blue-500 text-center">Uploading...</p>
        ) : (
          formData.avatar && (
            <div className="mt-4">
              <img
                src={formData.avatar}
                alt="Uploaded Avatar"
                className="w-full rounded-lg"
              />
            </div>
          )
        )}

        <div className="mt-4 text-center">
          {uploading ? (
            <p>Processing...</p>
          ) : (
            formData.avatar && <p>Image uploaded successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyImageUploadComponent;
