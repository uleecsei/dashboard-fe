export interface IUploadFileResponse {
  asset_id?: string | null;
  public_id: string;
  version?: number;
  version_id: string;
  signature: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
  api_key: string;
}
