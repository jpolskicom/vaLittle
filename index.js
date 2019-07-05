export function vaLittle(){
  // rules
  this.required = value => {
    return !value.trim();
  }

  this.email = value => {
    return value === '' || value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? false : true;
  }

  this.phone = value => {
    return value === '' || value.match(/^(?:\(?\?)?(?:[-\.\(\)\s]*(\d)){9}\)?$/) ? false : true;
  }

  this.postCode = value => {
    return value === '' || value.match(/^([0-9]{2}\-[0-9]{3})$/) ? false : true;
  }
  this.requireGroupState = {};
  this.requireGroup = (value,group) => {
    if (value.trim() && value !== false && !this.requireGroupState.hasOwnProperty(group)) {
      this.requireGroupState[group] = false;
    }
    return false;
  }

  this.min = (value,val) => {
    return value === '' || value.length >= val ? false : true;
  }

  this.max = (value,val) => {
    return value === '' || value.length <= val ? false : true;
  }

  this.minVal = (value,val) => {
    return value === '' || value >= val  ? false : true;
  }

  this.maxVal = (value,val) => {
    return value === '' || value <= val ? false : true;
  }

  this.number = value => {
    return value === '' || value.match(/^([0-9 -]+)$/) ? false : true;
  }

  this.text = value => {
    return value === '' || value.match(/^([a-zA-Z _-]+)$/) ? false : true;
  }

  this.regex = (value,val) => {
    return value === '' || value.match(new RegExp(val)) ? false : true;
  }

  // check
  this.rules = {};
  this.messages = {};

  this.prepareResults = () => {
    for(let r in this.results){
      if (!Object.keys(this.results[r]).indexOf('requireGroup')) {
        let g = this.requireGroupState[this.rules[r].requireGroup];
        this.results[r].requireGroup =  g === true || g === undefined ? true : false;
      }
      let e = Object.values(this.results[r]).indexOf(true);
      this.results[r].errors = e == -1 ? false : true;
      this.results[r].message = e == -1 ? false : this.messages[r][Object.keys(this.rules[r])[e]];
    }
    let e = Object.keys(this.results).map(e => { return this.results[e].errors; }).indexOf(true);
    this.results.errors = e !== -1 ? true : false;
  }

  this.check = data => {
    var t = this;
    this.results = {}
    for (let r in t.rules) {
      this.results[r] = {};
      var error = false;
      Object.keys(t.rules[r]).forEach((rule) => {
        let v = t.rules[r][rule];
        if (v === true) {
          var error = this[rule](data[r]);
        }else if (v !== false) {
          var error = this[rule](data[r],v);
        }
        this.results[r][rule] = error;
      })
    }
    this.prepareResults();
    this.requireGroupState = {};
    return this.results;
  }
}
