import fs from "fs/promises";

class ProductManager {
  static #instance = null;
  #products;
  #uploadTimes;
  #initialized = false;

  constructor() {
    if (ProductManager.#instance) {
      return ProductManager.#instance;
    }

    this.#products = {
      사과: null,
      상추: null,
      배추: null,
      무: null,
      배: null,
      양파: null,
      대파: null,
      감자: null,
      건고추: null,
      마늘: null,
    };

    this.#uploadTimes = {
      사과: null,
      상추: null,
      배추: null,
      무: null,
      배: null,
      양파: null,
      대파: null,
      감자: null,
      건고추: null,
      마늘: null,
    };

    ProductManager.#instance = this;
  }

  init() {
    if (this.#initialized) return;

    this.#initialized = true;
  }

  isExpired(key) {
    if (!this.#uploadTimes[key]) return true;

    const uploadTime = this.#uploadTimes[key];
    const currentTime = Date.now();
    const HOURS_48_IN_MS = 48 * 60 * 60 * 1000;

    return currentTime - uploadTime >= HOURS_48_IN_MS;
  }

  static getInstance() {
    return new ProductManager();
  }

  async addProduct(key) {
    const csvBuffer = await fs.readFile(`./src/output/processed_${key}.csv`);
    const googleFileApiEndpoint = process.env.GOOGLE_FILE_API_ENDPOINT;

    // 초기 업로드 요청
    const initialResponse = await fetch(googleFileApiEndpoint, {
      method: "POST",
      headers: {
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Length": csvBuffer.length,
        "X-Goog-Upload-Header-Content-Type": "text/csv",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: {
          display_name: `processed_${key}.csv`,
        },
      }),
    });

    const uploadUrl = initialResponse.headers.get("x-goog-upload-url");

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Length": csvBuffer.length,
        "X-Goog-Upload-Offset": "0",
        "X-Goog-Upload-Command": "upload, finalize",
      },
      body: csvBuffer,
    });

    const fileInfo = await uploadResponse.json();
    const fileUri = fileInfo.file.uri;

    this.#products[key] = fileUri;
    this.#uploadTimes[key] = Date.now();
  }

  get products() {
    return this.#products;
  }
}

export const productManager = new ProductManager();
