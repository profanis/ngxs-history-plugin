export class AddProduct {
  static readonly type = '[Shopping] Add product';
  constructor(public title: string) {}
}

export class RemoveProduct {
  static readonly type = '[Shopping] Remove product';
  constructor(public order: number, public title: string) {}
}

export class UpdateProduct {
  static readonly type = '[Shopping] Update todo';
  constructor(public order: number, public title: string) {}
}
export class ChangeStatus {
  static readonly type = '[Shopping] Change status';
  constructor(
    public order: number,
    public title: string,
    public status: boolean
  ) {}
}
