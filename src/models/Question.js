export default class Question {
    static TYPES = Object.freeze({
      MCHOICE: "Multiple Choice",
      CHECK: "Checkbox",
      TEXT: "Free Response",
      DROPDOWN: "Dropdown"
    });
  
    static DEFAULTS = Object.freeze({
      text: "Edit Question",
      type: Question.TYPES.MCHOICE,
      options: ['Option 1']
    });
  
    constructor(params = {}) {
      const { text, type, options, id } = { ...Question.DEFAULTS, ...params };
      this.text = text;
      this.type = type;
      this.options = options;
      this.id = id || Math.random();
    }
  
    //returns whether the questiontype has options or not (i.e is it multiple choice)
    get hasOptions() {
      return (
        this.type === Question.TYPES.MCHOICE || this.type === Question.TYPES.CHECK
      );
    }

    get hasDropdown(){
      return this.type === Question.TYPES.DROPDOWN;
    }
  
    get inputType() {
      if (this.type === Question.TYPES.MCHOICE) return "radio";
      if (this.type === Question.TYPES.CHECK) return "checkbox";
      throw new Error("This question does not have an input type.");
    }
  
    merge(patch) {
      return new Question({ ...this, ...patch });
    }
  }
  