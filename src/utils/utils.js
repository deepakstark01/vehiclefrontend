import SimpleCrypto from "simple-crypto-js"
 
export const setUser = (data) => {
  const simpleCrypto = new SimpleCrypto('SCRAPY@!@#123')
  const cipherText = simpleCrypto.encrypt(JSON.stringify(data))
  localStorage.setItem("data", cipherText);
};
 
export const getUser = () => {
  const simpleCrypto = new SimpleCrypto('SCRAPY@!@#123')
  const data = localStorage.getItem("data");
  if (data) {
    const decipherText = simpleCrypto.decrypt(data)
    return decipherText
  }
  return null;
};
