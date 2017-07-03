/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('have URLs defined and are non empty',function() {
             for(var i=0;i<allFeeds.length;i++) {
                expect(allFeeds[i].url).not.toBe(undefined);
                expect(allFeeds[i].url).not.toBe('');
            }
         });

        it('have Names defined and are non empty',function() {
            for(var i=0;i<allFeeds.length;i++) {
                expect(allFeeds[i].name).not.toBe(undefined);
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe("The menu",function() {


        it("is hidden by default",function() {
             var b = $('body').hasClass('menu-hidden');
             expect(b).toBeTruthy();
        });

        it("changes visibility when the menu icon is clicked" ,function() {
            $('.menu-icon-link').click();
            var b = $('body').hasClass('menu-hidden');
            expect(b).toBeFalsy();

            $('.menu-icon-link').click();
            b = $('body').hasClass('menu-hidden');
            expect(b).toBeTruthy();
        });
    });

    describe("Initial Entries",function() {
        beforeEach(function(done) {
            loadFeed(0,function() {
               done();
            });
        });

        it("has at least single entry within the .feed container",function() {
            var entryArray = $('.feed').find('article.entry');
            var lenOfElem = entryArray.length;
            expect(lenOfElem).toBeGreaterThan(0);
        });
    });

    describe("New Feed Selection",function() {
        var content,newContent;

        beforeEach(function(done) {
            loadFeed(0,function() {
                content = $('.feed').text();
                loadFeed(1,function() {
                    newContent = $('.feed').text();
                    done();
                });
            });
        });


        it("always changes the content",function() {
            expect(newContent).not.toBe(content);
        });
    });

}());
