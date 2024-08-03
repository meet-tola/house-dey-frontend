"use client";
import React, { useState } from "react";
import { Image } from "cloudinary-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "bxmkzdav");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvvirefzi/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const file = await res.json();

      setImage(file.secure_url);
      onImageUpload(file.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      {image && (
        <div className="h-20 w-20 rounded-full">
          <Image cloudName="dvvirefzi" publicId={image} />
        </div>
      )}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Upload Profile</Label>
        <Input id="file" type="file" onChange={uploadImage} />
      </div>
    </div>
  );
};

export default ImageUploader;
