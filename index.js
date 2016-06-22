var defaultMarkdown = "Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Sachin Mour](https://github.com/sachinmour)*";
var less = false;
var more = true;
class Markdown extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      markdown: defaultMarkdown,
      preview: marked(defaultMarkdown)
    }
  }

  parallelScrolling(e) {
    var element = e.target;
    var totalHeightElement = e.target.scrollHeight;
    var siblingElement;
    if (element.nextSibling) {
      siblingElement = element.nextSibling;
    } else {
      siblingElement = element.previousSibling;
    }
    siblingElement.onScroll = null;
    var totalHeightSiblingElement = siblingElement.scrollHeight;
    siblingElement.scrollTop = element.scrollTop * totalHeightSiblingElement / totalHeightElement;
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value,
      preview: marked(e.target.value)
    });
  }

  switch (e) {
    var element = e.target;
    if (element.innerHTML.toLowerCase() === "preview") {
      element.innerHTML = "Markdown";
      var currentElement = document.getElementById('preview');
      currentElement.className = "";
      var nextElement = document.getElementById('markdown');
      nextElement.className = "hidden";
    } else {
      element.innerHTML = "Preview";
      var currentElement = document.getElementById('markdown');
      currentElement.className = "";
      var nextElement = document.getElementById('preview');
      nextElement.className = "hidden";
    }
  }

  handleResize(e) {
    if (window.innerWidth <= 1020 && !less) {
      less = true;
      more = false;
      document.getElementById('preview').className = "hidden";
    } else if (window.innerWidth > 1020 && !more) {
      more = true;
      less = false;
      document.getElementById('markdown').className = "";
      document.getElementById('preview').className = "";
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div id="content">
          <textarea id="markdown" value={this.state.markdown} onChange={(e) => this.handleChange(e)} onScroll={(e) => this.parallelScrolling(e)} />
          <div id="preview" dangerouslySetInnerHTML={{__html: this.state.preview}}></div>
          <p className="switch" onClick={(e) => this.switch(e)} >Preview</p>
        </div>
    )
  }

}
ReactDOM.render(
  <Markdown />,
  document.getElementById('app')
);
