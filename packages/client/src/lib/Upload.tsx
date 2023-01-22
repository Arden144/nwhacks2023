import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAsset } from "@livepeer/react";
import { Video } from "model";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { fmap } from "./utils";

const COURSE_ID = "";

function Upload() {
  const [video, setVideo] = useState<Video | undefined>(undefined);
  const { mutate, data, status, error, progress } = useCreateAsset(
    fmap(video, (file) => ({ sources: [file] as const }))
  );

  const onDrop = (files: File[]) => {
    const [file] = files;
    setVideo({ name: file.name, file });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".webm", ".wmv", ".mkv", ".flv"],
    },
  });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <button
        disabled={status === "loading" || !mutate}
        onClick={() => {
          mutate?.();
        }}
      >
        Create Video
      </button>
      {progress?.map((upload) => (
        <div key={upload.name}>
          <span>Uploading</span>
          <span>{upload.name}</span>
          <progress value={upload.progress} />
        </div>
      ))}
      {data?.map((asset) => (
        <div key={asset.id}>
          <div>
            <div>Asset Name: {asset?.name}</div>
            <div>Playback URL: {asset?.playbackId}</div>
          </div>
        </div>
      ))}

      <p>{status}</p>
      <p>{error && <div>{error.message}</div>}</p>
    </>
  );
}

export default Upload;
