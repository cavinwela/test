describe('Pre Enrollment', () => {
  before(() => {
    cy.login("administrator", "wela.online");
  });

  it('access pre enrollment', function() {
    cy.visit("/desk");
    cy.get('#navbar-search').clear('p');
    cy.wait(2000);
    cy.get('#navbar-search').type('pre enrollment');
    cy.get('[aria-selected="true"]').click();

    cy.url().should('include', '/app/pre-enrollment');

  });
});
