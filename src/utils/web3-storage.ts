import { Web3Storage } from 'web3.storage'

function makeStorageClient() {
  return new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN!,
  })
}

async function makeFileObjects(data: any, file?: File) {
  const buffer = Buffer.from(JSON.stringify(data))
  const files = [new File([buffer], 'data.json'), file]
  return files
}

async function storeFiles(files: any) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  return cid
}

export async function storeData(data: any, file?: File) {
  const files = await makeFileObjects(data, file)
  const cid = await storeFiles(files)
  console.log('cid', cid)
  return cid
}
