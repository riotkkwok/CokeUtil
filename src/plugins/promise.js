/*
 * UPromise - Promises API
 *
 * An additional modules of CokeUtil, also indenpendent usage as UPromise.
 *
 * Released under the MIT license
 *
 * See https://github.com/riotkkwok/CokeUtil for details
 *
 * Auther: Rio Kwok
 *
 * Version: 1.1.0
 *
 * Updates: 
 * 1. rename as UPromise
 * 2. update serveral lines of code to follow the JSLint's rule
 *
 */

(function(factory){
    if(typeof exports === 'object' && typeof module !== 'undefined'){
        // CMD
        modul.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        // AMD
        define(factory);
    } else {
        // Browser globals
        if(window.CokeUtil){
            window.CokeUtil.UPromise = factory();
        }else{
            window.UPromise = factory();
        }
    }
})(function(){
    var UPromise = function(fn, isAsyn) {
        var self = this;
        self.queue = [];
        self.current = 0;
        self.isResolved = false;
        self.isNextThen = false;
        self.resolveArgs = null;
        self.then = function(fn, isAsyn) {
            var noPending = self.isNextThen && (self.current === self.queue.length);
            if(typeof fn == 'function'){
                self.queue.push({
                    fn: fn,
                    isAsyn: !!isAsyn,
                    isDone: false
                });

                if(!!noPending){
                    self.next.apply(self, self.resolveArgs);
                }
            }
            return self;
        };
        self.start = function() {
            var args = Array.prototype.slice.call(arguments);
            self.resolve.apply(self, args);
            return self;
        };

        self.resolve = function() {
            var args = Array.prototype.slice.call(arguments);

            if(self.isResolved){ // not allow to call again.
                console.warn('repeat to resolve error.');
                return;
            }

            self.isResolved = true;
            self.isNextThen = true;
            self.resolveArgs = args;

            self.next.apply(self, args);
        };
        self.next = function(){
            var args = Array.prototype.slice.call(arguments), cbFunc;
            if(!self.isResolved){
                console.warn('unresolved error.');
                return;
            }
            self.isNextThen = true;

            if (self.current != self.queue.length) {
                cbFunc = self.queue[self.current++];
                cbFunc.fn.apply(self, args);
                cbFunc.isDone = true;
                if(!cbFunc.isAsyn){
                    self.next.apply(self, args);
                }else{
                    self.isNextThen = false;
                }
            }
        };
        if (fn) {
            self.then(fn, isAsyn);
        }
        return self;

    };

    UPromise.when = function() {
        var args = Array.prototype.slice.call(arguments), newP = new UPromise();

        function finish() {
            var p = this;
            setTimeout(function() {
                var j = 0;
                for (var i = 0; i < args.length; i++) {
                    if (p === args[i]) {
                        args[i] = null;
                    }
                    if (args[i] === null) {
                        j++;
                    }
                }
                if (j === args.length) {
                    newP.resolve();
                }
            }, 0);
        }

        for (var i = 0; i < args.length; i++) {
            if (args[i] instanceof UPromise) {
                args[i].then(finish);
            }
        }

        return newP;
    };

    return UPromise;
});