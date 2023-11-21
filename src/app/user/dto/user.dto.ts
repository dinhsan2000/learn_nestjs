class UserDto {
  private readonly id: number;
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
