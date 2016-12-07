(function () {
  angular.module('basketApp').controller('basketCtrl', basketCtrl);

  function basketCtrl() {
    this.good = {
      name: '',
      price: ''
    };

    this.discount = '';
    this.listGoods = [];
    this.sumPrices = 0;
  }

  basketCtrl.prototype.addGood = function (name, price) {
    this.listGoods.push(
      {
        name: name,
        price: price,
        discount: ''
      }
    );
    if (this.discount) {
      this.addDiscount()
    }
    clearGood(this.good);
  };

  basketCtrl.prototype.addDiscount = function () {
    this.sumGoods();
    var remainsDiscount = this.discount;

    var maxPrice = 0, idx;

    for (var i = 0; this.listGoods.length > i; i++) {
      var good = this.listGoods[i];
      if(good.price > maxPrice) {
        maxPrice = good.price;
        idx = i;
      }
      var priceRatio = Math.round(good.price / this.sumPrices * 100);
      var goodDiscount = Math.round(this.discount * priceRatio / 100);
      good.discount = good.price - goodDiscount;
      remainsDiscount -= goodDiscount;
    }
    this.listGoods[idx].discount -= remainsDiscount;
  };

  basketCtrl.prototype.sumGoods = function () {
    this.sumPrices = this.listGoods.reduce(function (a, b) {
      return a + b.price;
    }, 0);
  };

  function clearGood(good) {
    good.name = '';
    good.price = '';
  }

}());