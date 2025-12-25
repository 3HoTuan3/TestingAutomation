export class User {
  public readonly username: string;
  public readonly password: string;
  public readonly confirmPassword?: string;
  public readonly pid: string;

  constructor({
    username = "testrail@gmail.com",
    password = "123456789",
    confirmPassword,
    pid = "123456789",
  }: {
    username?: string;
    password?: string;
    confirmPassword?: string;
    pid?: string;
  }) {
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.pid = pid;
  }
}
