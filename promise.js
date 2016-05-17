/*
 * Promise - Promises API
 *
 * An additional modules of CokeUtil, also indenpendent usage as Promise.
 *
 * Released under the MIT license
 *
 * See https://github.com/riotkkwok/CokeUtil for details
 *
 * Auther: Rio Kwok
 *
 * Version: 1.0.0
 *
 * Updates: 
 * 1. adapt to AMD/CMD module loader.
 *
 */

!function(factory){
    if(typeof exports === 'object' && typeof module !== 'undefined'){
        // CMD
        modul.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        // AMD
        define(factory);
    } else {
        // Browser globals
        if(window.CokeUtil){
            window.CokeUtil.Promise = factory();
        }else{
            window.Promise = factory();
        }
    };
}(function(){
    var Promise = function(fn, isAsyn) {
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

                noPending && self.next.apply(self, self.resolveArgs);
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

    Promise.when = function() {
        var args = Array.prototype.slice.call(arguments), newP = new Promise();

        function finish(p) {
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
        }

        for (var i = 0; i < args.length; i++) {
            if (args[i] instanceof Promise) {
                args[i].then(function() {
                    var _this = this;
                    setTimeout(function() {
                        finish(_this);
                    }, 0);
                });
            }
        }

        return newP;
    };

    return Promise;
});