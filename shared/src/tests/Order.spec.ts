
import { v4 as uuid } from "uuid";
import { Order } from "../entities/Order";

describe("Order", () => {
  const orderId = uuid();
  const orderDescription = "Desc";
  const orderLabel = "Label";
  let order: Order;

  beforeEach(() => {
    order = new Order(orderId, orderDescription, orderLabel);
  });

  it("Should have an ID", () => {
    expect(order.id).toEqual(orderId);
  });

  it("Should have a description", () => {
    expect(order.description).toEqual(orderDescription);
  });

  it("Should have a label", () => {
    expect(order.label).toEqual(orderLabel);
  });

  describe("constructor", () => {
    it("Should set a new ID if none is provided", () => {
      const newOrder = new Order(null, orderDescription, orderLabel);
      expect(newOrder.id).not.toEqual(orderId);
    });
  });

  describe("edit", () => {
    it("Should update the description", () => {
      const newDescription = "New Description";
      order.edit(newDescription);
      expect(order.description).toEqual(newDescription);
    });

    it("Should update the label", () => {
      const newLabel = "New Label";
      order.edit(undefined, newLabel);
      expect(order.label).toEqual(newLabel);
    });

    it("Should update both description and label", () => {
      const newDescription = "New Description";
      const newLabel = "New Label";
      order.edit(newDescription, newLabel);
      expect(order.description).toEqual(newDescription);
      expect(order.label).toEqual(newLabel);
    });
  });
});