// AngularJS Application
angular.module('bookApp', [])
    .controller('BookController', ['$http', function ($http) {
        const vm = this;
        vm.query = '';
        vm.books = [];
        vm.hasSearched = false;

        vm.searchBooks = function () {
            const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(vm.query)}&limit=12`;
            $http.get(url)
                .then(function (response) {
                    const books = response.data.docs;
                    vm.books = books.map(book => ({
                        title: book.title || 'No Title Available',
                        author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
                        coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/150',
                    }));
                    vm.hasSearched = true;
                })
                .catch(function (error) {
                    console.error('Error fetching data:', error);
                    vm.books = [];
                    vm.hasSearched = true;
                });
        };
    }]);