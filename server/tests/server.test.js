const expect = require("expect");
const request = require("supertest");

const {ObjectID} = require("mongodb");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [{
  _id: new ObjectID(),
  text: "First test todo"
}, {
  _id: new ObjectID(),
  text: "Second test todo",
  completed: true,
  completedAt: 333
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
        expect(res.body.todos.length).toBe(21);
      })
      .end(done);
  });
});

describe("Get /todos/:id", () => {
  it("Should return todo doc", (done) => {
    var hexId = todos[0]._id.toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.text).toBe(todos[0].text);
      })
      .end(done);
  });
});

describe("Delete /todos/:id", () => {
  it("Should remove a todo", (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findbyID(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it("Should return a 404 if todo is not found", (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it("Should return a 404 if object ID is invalid", (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/123ABC`)
      .expect(404)
      .end(done);
  });
});

describe("Patch /todos/:id", () => {
  it("Should update the todo", (done) => {
    var id = todos[0]._id.toHexString();

    var text = "This should be the new text"

    request(app)
      .patch(`/todos/${id}`)
      .send({
        text,
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it("Should clear completedAt when todo is not completed.", (done) => {
    var id = todos[1]._id.toHexString();

    var text = "Ah - this isn't complete!"

    request(app)
      .patch(`/todos/${id}`)
      .send({
        text,
        completed: false,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
