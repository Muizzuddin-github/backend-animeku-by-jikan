class ResponseErr extends Error {
  private statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  public get getStatusCode() {
    return this.statusCode;
  }
}

export default ResponseErr;
