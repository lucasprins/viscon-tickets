import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "AKIA2PPX4INGVLBBWGNF",
  secretAccessKey: "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",
  region: "eu-central-1",
});

async function uploadFile(file: File, onUploadProgress: React.Dispatch<React.SetStateAction<number>>) {
  const key = `${Math.round(Math.random() * 1000000)}.${file.name}`;

  const params = {
    Bucket: "viscon-tickets",
    Key: key,
    Body: file,
  };

  const upload = new AWS.S3.ManagedUpload({
    params: params,
    service: s3,
    partSize: 5 * 1024 * 1024, // 5MB chunk sizes
  });

  upload.on("httpUploadProgress", (evt) => {
    console.log(evt);
    const progress = Math.floor((evt.loaded / evt.total) * 100);
    onUploadProgress(progress); // Use this to update the progress state in the React component
  });

  const result = await upload.promise();

  return { Key: key, URL: result.Location };
}

async function removeFile(key: string) {
  const params = {
    Bucket: "viscon-tickets",
    Key: key,
  };

  const result = await s3.deleteObject(params).promise();

  return result;
}

const FileService = {
  uploadFile,
  removeFile,
};

export default FileService;
