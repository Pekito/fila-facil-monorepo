import { v4 as uuid } from 'uuid';

export class Order {
  public readonly id: string;
  public description: string;
  public label: string;

  constructor(id: string | null | undefined, description: string, label: string) {
    if (id === null || id === undefined) this.id = uuid();
    else this.id = id;
    this.description = description;
    this.label = label;
  }

  public edit(description?: string, label?: string): void {
    if (description) {
      this.description = description;
    }
    if (label) {
      this.label = label;
    }
  }
}