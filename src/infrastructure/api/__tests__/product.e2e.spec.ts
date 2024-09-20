import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 100,
        type: 'a'
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(100);
    expect(response.body.id).toBeDefined()

  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "",
      price: -12
    });
    expect(response.status).toBe(500);
  });

  it("Should list all products", async () => {
    await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 100,
        type: 'a'
      });
    await request(app)
      .post("/product")
      .send({
        name: "Product B",
        price: 150,
        type: 'b'
      });
    
      const response = await request(app).get("/product")
      expect(response.status).toBe(200)
      console.log("response",response.body)
      expect(response.body.products.length).toBe(2)
      expect(response.body.products[0].id).toBeDefined()
      expect(response.body.products[0].name).toBe("Product A")
      expect(response.body.products[0].price).toBe(100)
      expect(response.body.products[1].id).toBeDefined()
      expect(response.body.products[1].name).toBe("Product B")
      expect(response.body.products[1].price).toBe(300)
  })

});