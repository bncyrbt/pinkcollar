import { storageClient } from "@/lib/storage/client";
import { walletOnly } from "@lens-chain/storage-client";
import { evmAddress } from "@lens-protocol/client";
import { account, MetadataAttributeType } from "@lens-protocol/metadata";
import { AppConfig } from "../pinkcollar/config";

type CreateAccountMetadataPrams = {
  wallet: string;
  name?: string;
  profession: string[];
  bio?: string;
  imageFile?: File;
};

export async function createAccountMetadata({
  wallet,
  name,
  profession,
  bio,
  imageFile,
}: CreateAccountMetadataPrams) {
  let imageUri;
  if (imageFile) {
    const { uri } = await storageClient.uploadFile(imageFile, {
      acl: walletOnly(evmAddress(wallet), AppConfig.APP_CHAIN.id),
    });
    imageUri = uri;
  }

  const metadata = account({
    ...(name && { name }),
    ...(bio && { bio }),
    ...(imageUri && { picture: imageUri }),
    attributes: [
      {
        key: "profession",
        type: MetadataAttributeType.JSON,
        value: JSON.stringify(profession),
      },
    ],
  });
  const { uri } = await storageClient.uploadAsJson(metadata, {
    acl: walletOnly(evmAddress(wallet), AppConfig.APP_CHAIN.id),
  });

  return uri;
}
