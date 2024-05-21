// require ( './helpers.js' );

// const sinon = require( 'sinon' );
// const helpers = require( './helpers' );
// const chai = require( 'chai' );
// const spies = require( 'chai-spies' );

// chai.use( spies );


// describe( "index.js", () => {
//   describe( 'fetchBooks()', () => {

//     beforeEach( () => {
//       window.document.body.innerHTML = '<main></main>'
//       window.fetch = require( 'node-fetch' );
//     } );

//     it( "sends a fetch request to 'https://anapioficeandfire.com/api/books'", async () => {
//       chai.spy.on( window, 'fetch' );
//       await fetchBooks()
//       expect( window.fetch, "A fetch to the API was not found" )
//         .to.have.been.called.with( 'https://anapioficeandfire.com/api/books' );
//     } )

//     it( "renders book titles into the DOM by passing a JSON object to renderBooks()", async () => {
//       chai.spy.on( window, 'renderBooks' );
//       await fetchBooks().then(() => {
//         expect( window.renderBooks ).to.have.been.called();
//       })
//     } )
//   } )
// })

require('./helpers.js');

const sinon = require('sinon');
const helpers = require('./helpers');
const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);
const expect = chai.expect;

describe("index.js", () => {
  describe('fetchBooks()', () => {
    let fetchStub;
    let renderBooksSpy;

    beforeEach(() => {
      window.document.body.innerHTML = '<main></main>';
      window.fetch = require('node-fetch');

      // Stub fetch to return a resolved promise with test data
      fetchStub = sinon.stub(window, 'fetch').resolves({
        json: () => Promise.resolve([
          { name: 'A Game of Thrones' },
          { name: 'A Clash of Kings' }
        ])
      });

      // Spy on renderBooks
      renderBooksSpy = sinon.spy(window, 'renderBooks');
    });

    afterEach(() => {
      fetchStub.restore();
      renderBooksSpy.restore();
    });

    it("sends a fetch request to 'https://anapioficeandfire.com/api/books'", async () => {
      await fetchBooks(renderBooksSpy);
      expect(fetchStub.calledOnce).to.be.true;
      expect(fetchStub.calledWith('https://anapioficeandfire.com/api/books')).to.be.true;
    });

    it("renders book titles into the DOM by passing a JSON object to renderBooks()", async () => {
      await fetchBooks(renderBooksSpy);
      expect(renderBooksSpy.calledOnce).to.be.true;
      expect(renderBooksSpy.calledWith([
        { name: 'A Game of Thrones' },
        { name: 'A Clash of Kings' }
      ])).to.be.true;
    });
  });
});
