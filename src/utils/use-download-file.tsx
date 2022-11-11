import { useState } from "react";
import useApi from "./use-api";

interface DownloadFileProps {
  readonly onStart?: () => void;
  readonly onEnd?: () => void;
  readonly onError: () => void;
  readonly getFileName: () => string;
}

interface DownloadedFileInfo {
  readonly downloadAction: (path: string) => Promise<void>;
  readonly downloadLoading: boolean;
}

const useDownloadFile = ({
  onStart,
  onEnd,
  onError,
  getFileName,
}: DownloadFileProps): DownloadedFileInfo => {
  const api = useApi();
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  const downloadAction = async (path: string) => {
    try {
      onStart?.();
      setDownloadLoading(true)
      const { data } = await api.get(path, { responseType: "blob"});

      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', getFileName());
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      onEnd?.();
      setDownloadLoading(false)
      URL.revokeObjectURL(url);
    } catch (error) {
      onError();
    }
  };

  return { downloadAction, downloadLoading };
};

export default useDownloadFile;