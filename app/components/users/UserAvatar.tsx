"use client" 
import { useState } from "react";


interface Props {
  src: string;
  alt: string;
}
const UserAvatar = ({ src, alt }: Props) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? "/avatar.svg" : src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setError(true)}
    />
  );
}
export default UserAvatar