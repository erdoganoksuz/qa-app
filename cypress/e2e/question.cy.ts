describe("Question", () => {
  beforeEach(() => {
    cy.visit("/"); // for isolation.
  });

  it("Check default question", () => {
    cy.get(".question-row b")
      .first()
      .should("have.text", "How can i add a question? CLICK ME")
      .click();

    cy.get(".question-row div div")
      .first()
      .should(
        "have.text",
        "You can enter your question and answer the above form and click the save button"
      );
  });

  it("Add new question", () => {
    const question = "TEST QUESTION";
    const answer = "TEST ANSWER";

    cy.get("#question").type(question);
    cy.get("#answer").type(answer);

    cy.get("input:submit").click();

    cy.get(".question-row b")
      .last()
      .scrollIntoView()
      .should("have.text", question)
      .click();

    cy.get(".question-row div div").last().should("have.text", answer);
  });

  it("Remove first Question", () => {
    cy.get(".question-row .button-red").first().click();
    cy.get(".question-row").should("have.length", 0);
  });

  it("Edit added Question", () => {
    const question = "EDIT QUESTION";
    const answer = "EDIT ANSWER";

    cy.get(".question-row .button-blue").click();

    cy.get(".question-row label+input").clear().type(question);
    cy.get(".question-row textarea").clear().type(answer);

    cy.get(".question-row .button-green").click();

    cy.get(".question-row b")
      .last()
      .scrollIntoView()
      .should("have.text", question)
      .click();

    cy.get(".question-row div div").last().should("have.text", answer);
  });

  it("Add new question with 5s delay", () => {
    const question = "DELAY QUESTION";
    const answer = "DELAY ANSWER";

    cy.get("#question").type(question);
    cy.get("#answer").type(answer);

    cy.get(".delay-checkbox").click();
    cy.get("input:submit").click();

    cy.wait(5100);

    cy.get(".question-row b")
      .last()
      .scrollIntoView()
      .should("have.text", question)
      .click();

    cy.get(".question-row div div").last().should("have.text", answer);
  });

  it("Remove all questions", () => {
    const question = "REMOVE QUESTIONS";
    const answer = "REMOVE ANSWERS";

    cy.get("#question").type(question);
    cy.get("#answer").type(answer);

    cy.get("input:submit").click();

    cy.get(".question-row").should("have.length", 2);

    cy.get("button").contains("Remove Questions").click();

    cy.get(".question-row").should("have.length", 0);

    cy.get(".error-bar").should("have.text", "Questions not found :(");
  });

  it("Sort all questions", () => {
    const question1 = "Alpha";
    const question2 = "Bravo";
    const question3 = "Charlie";

    cy.get("#question").type(question2);
    cy.get("#answer").type("A");
    cy.get("input:submit").click();

    cy.get("#question").type(question1);
    cy.get("#answer").type("A");
    cy.get("input:submit").click();

    cy.get("#question").type(question3);
    cy.get("#answer").type("A");
    cy.get("input:submit").click();

    cy.get("button").contains("Sort Questions").click();

    cy.get(".question-row b").first().should("have.text", question1);
    cy.get(".question-row b").eq(1).should("have.text", question2);
    cy.get(".question-row b").eq(2).should("have.text", question3);
  });
});
