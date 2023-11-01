import React from 'react'
import Block from '../Block'
import './style.css'

export default function StudyGuide(props) {
  return (
    <div className="study-guide">
      <h1 className="study-guide__page-title">Javascript Study Guide</h1>

      <div className="study-guide__row">
        <div className="study-guide__title">Include JS in HTML page</div>
        <Block
          code={`<script type="text/javascript">...</script>`}
          language={'html'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Include external JS file</div>
        <Block
          code={`<script src="filename.js">...</script>`}
          language={'html'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Delay - 1 second timeout</div>
        <Block
          code={
            `setTimeout(function() { }, 1000);`}
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Comments</div>
        <Block
          code={
            `// Single-line comment 
            /* Multi-line comment */`}
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Variables</div>
        <Block
          code={
            `var = "Can be updated and re-declared";
            
            const person = "Mike";
            person = "John" // Will raise an error, person cannot be reassigned 
            
            let person = "Mike";
            person = "John";
            console.log(person) // "John", reassignment is allowed with let`
        }
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>

      <div className="study-guide__row">
        <div className="study-guide__title">Arrow Function</div>
        <Block
          code={
            `function double(x) { return x * 2; } // Traditional way
            console.log(double(2)) // 4 
            
            const double = x => x * 2; // Same function written as an arrow function with implicit return
            console.log(double(2)) // 4
            
            const double = (x) => x * 2; // Returns x * 2

            const getPerson = () => ({ name: "Nick", age: 24 })
            console.log(getPerson()) // { name: "Nick", age: 24 } -- object implicitly returned by arrow function

            () => { // parentheses are provided, everything is fine
              const x = 2;
              return x;
            }`
          }
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Function default parameter value</div>
        <div className="study-guide__text">Starting from ES2015 JavaScript update, you can set default value to your function parameters using the following syntax:</div>
        <Block
          code={
            `function myFunc(x = 10) {
                return x;
              }
              console.log(myFunc()) // 10
              console.log(myFunc(5)) // 5
              console.log(myFunc(undefined)) // 10
              console.log(myFunc(null)) // null `}
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Destructuring objects and arrays</div>
        <div className="study-guide__text"></div>
        <Block
          code={
            `const person = {firstName: "Mike", lastName: "Anderson", age: 35, sex: "M"}
              
            const { firstName: first, age, city = "Paris" } = person;
            
            function joinFirstLastName({ firstName, lastName }) {return firstName + '-' + lastName;}
              
            joinFirstLastName(person); // "Mike-Anderson"`}
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
        <Block
          code={
            `const myArray = ["a", "b", "c"];
            const [x, y] = myArray;
            console.log(x) // "a"
            console.log(y) // "b"`}
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Array Methods - map / filter / reduce / find </div>
        <div className="study-guide__text">
            <ul>
                <li><strong>Array.prototype.map()</strong> takes an array, does something on its elements and returns an array with the transformed elements.</li>
                <li><strong>Array.prototype.filter()</strong> takes an array, decides element by element if it should keep it or not and returns an array with the kept elements only</li>
                <li><strong>Array.prototype.reduce()</strong> takes an array and aggregates the elements into a single value (which is returned)</li>
                <li><strong>Array.prototype.find()</strong> takes an array, and returns the first element that satisfies the provided condition.</li>
            </ul>
        </div>
        
        <Block
          code={
            `const numbers = [0, 1, 2, 3, 4, 5, 6];

            const doubledNumbers = numbers.map(n => n * 2); // [0, 2, 4, 6, 8, 10, 12]
            const evenNumbers = numbers.filter(n => n % 2 === 0); // [0, 2, 4, 6]
            const sum = numbers.reduce((prev, next) => prev + next, 0); // 21
            const greaterThanFour = numbers.find((n) => n > 4); // 5`
        }
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Array Methods</div>
        <div className="study-guide__text"></div>
            <ul>
                <li><strong>concat()</strong> — Join several arrays into one</li>
                <li><strong>indexOf()</strong> — Returns the first position at which a given element appears in an array</li>
                <li><strong>join()</strong> — Combine elements of an array into a single string and return the string</li>
                <li><strong>lastIndexOf()</strong> — Gives the last position at which a given element appears in an array</li>
                <li><strong>pop()</strong> — Removes the last element of an array</li>
                <li><strong>push()</strong> — Add a new element at the end</li>
                <li><strong>reverse()</strong> — Sort elements in a descending order</li>
                <li><strong>shift()</strong> — Remove the first element of an array</li>
                <li><strong>slice()</strong> — Pulls a copy of a portion of an array into a new array</li>
                <li><strong>sort()</strong> — Sorts elements alphabetically</li>
                <li><strong>splice()</strong> — Adds elements in a specified way and position</li>
                <li><strong>toString()</strong> — Converts elements to strings</li>
                <li><strong>unshift()</strong> —Adds a new element to the beginning</li>
                <li><strong>valueOf()</strong> — Returns the primitive value of the specified object</li>
            </ul>
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Spread Operator "..."</div>
        <div className="study-guide__text"></div>
        <Block
          code={
            `const arr1 = ["a", "b", "c"];
            const arr2 = [...arr1, "d", "e", "f"]; // ["a", "b", "c", "d", "e", "f"]
            
            const myObj = { x: 1, y: 2, a: 3, b: 4 };
            const { x, y, ...z } = myObj; // object destructuring
            console.log(x); // 1
            console.log(z); // { a: 3, b: 4 }

            const n = { x, y, ...z };
            console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
            `}
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
      <div className="study-guide__row">
        <div className="study-guide__title">Template Literals</div>
        <div className="study-guide__text"></div>
        <Block
          code={
            `const name = "Julie";
            console.log(\`Hello \${Julie}\`) // Hello Julie`
            }
          language={'JavaScript'}
          showLineNumbers={false}
          wrapLines
        />
      </div>
    </div>
  )
}
