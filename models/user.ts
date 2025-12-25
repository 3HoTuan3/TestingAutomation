export class User {
  public readonly username: string;
  public readonly password: string;
  public readonly confirmPassword?: string;
  public readonly pid: string;

  constructor(username: string = "testrail@gmail.com", password: string = "123456789", confirmPassword?: string, pid: string = "123456789") {
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.pid = pid;
  }
}
