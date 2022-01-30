interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables: any,
    path: string,
  ): Promise<void>;
}

export { IMailProvider };
