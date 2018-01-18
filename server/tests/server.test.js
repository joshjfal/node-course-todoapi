const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

beforeEach((done) => {
  Todo.remove({}).then(() => done()); //Delete everything from collection
});

describe("POST /todos", () => {
  it("Should create a new todo", (done) => {
    var text = "Test todo text";

    request(app)
      .post("/todos");
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err); //return stops function execution so code below doesn't run
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
});
