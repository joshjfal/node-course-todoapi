const expect = require("expect");
const request = require("supertest");

const {ObjectID} = require("mongodb");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

// beforeEach((done) => {
//   Todo.remove({}).then(() => done()); //Delete everything from collection
// });

// describe("POST /todos", () => {
//   it("Should create a new todo", (done) => {
//     var text = "Test todo text";
//
//     request(app)
//       .post("/todos");
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err); //return stops function execution so code below doesn't run
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         }).catch((e) => done(e));
//       });
// //   });
//
//   it("Should not create TODO with invalid body data", (done) => {
//     request(app)
//       .post("/todos");
//       .send({});
//       .expect(400);
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(0);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });

describe("GET /todos", () => {
  it("Should get all Todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("Get /todos/:id", () => {
  it("Should return todo doc", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      // .get('/todos/5a56ac49e7e45a40405095f9')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.text).toBe(todos[0].text);
      })
      .end(done);
  });
});
