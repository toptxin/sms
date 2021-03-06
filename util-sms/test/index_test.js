var sms = require('../lib/index.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['sms'] = {
  setUp: function(done) {
    sms.init('0000', {
      'hk': '【E票宝】您购买的{receipt}已经还款咯~，还款金额为{amount}，去看看吧！快乐投资、安心理财只在E票宝！'
    });
    done();
  },
  'send': function(test) {
    sms.send('手机号', 'hk', {
      'receipt': '银票123',
      'amount': '112.12'
    }, function(err, v) {
      // console.info(v);
      test.equal(err, null, 'should be null');
      test.done();
    });
  }
};