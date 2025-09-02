describe('template spec', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
	});

	it('Отображение страницы с ингредиентом', () => {
		cy.visit('/ingredients/643d69a5c3f7b9001cfa093c');
		cy.get('[data-testid=ingredient-name]').contains('Краторная булка N-200i');
		cy.get('[data-testid=ingredient-img]')
			.first()
			.should(
				'have.attr',
				'src',
				'https://code.s3.yandex.net/react/code/bun-02-large.png'
			);
	});

	it('Модальное окно открывается по клику на ингредиент и закрывается', () => {
		cy.visit('/');
		cy.get('[data-testid=drag-item]').first().click();
		cy.get('[data-testid=ingredient-name]')
			.as('name')
			.contains('Краторная булка N-200i');
		cy.get('[data-testid=ingredient-img]')
			.as('img')
			.first()
			.should(
				'have.attr',
				'src',
				'https://code.s3.yandex.net/react/code/bun-02-large.png'
			);
		cy.get('[data-testid=modal-close-btn]').click();
		cy.get('@name').should('not.exist');
	});
});
