/// <reference types="cypress" />

describe('template spec', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
	});

	it('Перетаскиваем булку', () => {
		cy.visit('/');

		cy.get('[data-testid=drag-item]').first().as('drag-item');
		cy.get('[data-testid=drop-target]').as('drop-target');

		cy.get('@drag-item').trigger('dragstart');
		cy.get('@drop-target').trigger('drop');
		cy.get('@drop-target').contains('Краторная булка').should('exist');
		cy.get('@drop-target').contains(1255).should('exist');
		cy.get('.constructor-element__image')
			.first()
			.should(
				'have.attr',
				'src',
				'https://code.s3.yandex.net/react/code/bun-02.png'
			);
	});

	it('Перетаскиваем ингредиент', () => {
		cy.visit('/');

		cy.get('[data-testid=drag-item]').eq(4).as('drag-item');
		cy.get('[data-testid=drop-target]').as('drop-target');

		cy.get('@drag-item').trigger('dragstart');
		cy.get('@drop-target').trigger('drop');
		cy.get('@drop-target')
			.contains('Соус традиционный галактический')
			.should('exist');
		cy.get('@drop-target').contains(15).should('exist');
		cy.get('.constructor-element__image')
			.eq(1)
			.should(
				'have.attr',
				'src',
				'https://code.s3.yandex.net/react/code/sauce-03.png'
			);
	});
});
