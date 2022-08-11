import abiJSON from "./Web3RSVP.json"
import { ethers } from "ethers"

function connectContract() {
  const contractAddress = "0x5931a300436249b5FCa4D09c5e3262844D87d43e"
  const contractABI = abiJSON.abi
  let rsvpContract

  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as any)
      const signer = provider.getSigner()
      rsvpContract = new ethers.Contract(contractAddress, contractABI, signer)
    } else {
      console.log("Ethereum object doesn't exist.")
    }
  } catch (error) {
    console.log(error)
  }

  return rsvpContract
}

export default connectContract
