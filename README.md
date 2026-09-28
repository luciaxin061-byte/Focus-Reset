# Focus-Reset: file:///Users/xinluxian/Documents/ChatGPT/5013/Focus-Reset/index.html
The experience is designed for students who notice that they have lost focus but may not know what small action to take next. I wanted the interaction to feel immediate and nonjudgmental. I used three clearly labeled states instead of asking the user to type because selecting a state is faster and makes the experience easier to use during a study session.

## AI Tool Used
I used Codex to explore design alternatives, create the initial prototype,
and revise problems identified during testing.

## Intended Interaction
When a student selects their current focus state, the experience should
show a matching visual theme and guide them through one short interactive
activity before inviting them to return to studying.

## Run it
Open `index.html` in a browser. No installation or build step is required.
## Files
- `index.html` contains the page structure and three state cards.
- `styles.css` provides the layout, responsive styles, state themes, and visual animation.
- `script.js` stores the state content and switches between the choices and reset views.

## Prompt 1:
I want to create a small browser-based focus-reset experience for students. The main interaction is choosing a current focus state and receiving a matching visual response and short action. Suggest three ways to implement this while keeping the project small enough to test carefully. Do not write the code yet.
### AI Response:
1. Static single-page app
2. card-based branching experience
3. Tiny component-based app

 I chose state cards with an instant reset. Because it expresses the full concept with the fewest variables, making it easier to test the quality of the state labels, visual mappings, activities, and return prompt.

 ## Prompt 2:
 Build a small version using HTML, CSS, and JavaScript. Include three focus-state choices. After a choice, update the color theme, show one matching reset activity, and provide a button to return to the choices. Keep the files simple and explain how the state changes work.
### AI Response: Focus Reset
A small browser-based focus reset for students. Choose a current focus state to receive a matching visual theme and one short activity.

## Prompt 3: 
I feel that the entire interaction is a bit too simple. Could we add an interactive element that can be completed on the webpage after the options are selected? Give me some suggestions.
### AI Response:
1. Guided breathing circle — best overall
2. One-task commitment
3. Distraction clearing
4. Grounding checklist
5. Hold-to-reset interaction

Based on its suggestions, I made my own dicision: 
I chose gathering thoughts for Scattered because it makes narrowing attention visible. For Stuck, I chose a small-step activity to help users turn an unclear task into an action they can begin. For Drained, I chose brief breathing and movement variations so users could take a short physical pause.

## Prompt 4:
change the website based on my description. first of all, I want to give the three states more adorable visual characteristics (different color and different character).Scattered use Floating small notes, and when you enter, you need to gather the scattered thoughts:
- Use cream colors
- Thoughts are made into irregular notes or candy shapes
- The selected thought "pops" into the center
- Other thoughts become slightly faint or drift away

Stuck uses : The gradually becoming clearer small window
- Utilizes mint green, light cyan, and soft gray
- The initial interface has a semi-transparent "fog"
- After the user fills in "first move" and selects the time, the fog becomes thinner
- After submission, the user's own plan is displayed:
  For the next 5 minutes: Open my notes.
On the side, a small plant just beginning to sprout can be seen, suggesting "Just a little bit at a time will do."

Drained: Elastic breathing balls
- Use pink, peach, and warm yellow
- After each step is completed, three small dots fill up like gummy candies
- When the button is pressed, it slightly shrinks and then pops back
- For the three activities, different small icons are used:
    - Breathing: Small clouds
    - Shoulder movement: Waves
    - Shake out: Lightning

## Prompt 5: 
Well done! You have basically completed my instructions. However, during my testing process, I discovered some issues: Firstly: The minor characters in the "Drained" section cannot be fully realized (the upper part cannot load); Secondly, in the "stuck" program, when I enter my "small step" and the time, it will help me generate the complete result. This is very good. But the little seed in the voice-over did not move along with the frame. Instead, it got stuck in its original position. Please help me fix these two problems.

## Modification Test Record

| Test | Expected | Actual result | Change | Retest |
| --- | --- | --- | --- | --- |
| Open the website to see the character of three states | The complete character is visible. | The upper half was hidden by a decorative CSS overlay. | Removed the overlay that masked the character. | Passed — the character is no longer obstructed. |
| In the "Stuck state", follow the instructions to input the text and make the choices. | The sprout and its caption remain attached to the small window when the form changes into the completed plan. | The sprout stayed in its original position instead of moving with the window frame. | Moved the sprout and caption inside the window frame and anchored them to its lower-right corner. | Passed — the plant is structurally attached to the window frame. |


## Reflection

Focus Reset largely matched my intention of creating an immediate, nonjudgmental experience for students who have lost focus. The three state cards let users recognize their situation without having to write a long explanation. However, the first version felt too passive because it mainly presented a non-interactive activity after a selection. I asked AI to suggest more interactive possibilities, then made my own choices: gathering thoughts for Scattered, breaking a task into a small step for Stuck, and offering breathing or movement variations for Drained. I also introduced different colors, characters, and visual metaphors to make each state more inviting and recognizable. My goal was to connect the playful elements to the activity: gathering notes represents narrowing attention, a clearing window represents finding a way forward, and a breathing ball supports a brief physical reset. These changes explored whether a more playful interface could support the original purpose without adding too many decisions.

Testing revealed that the visual ideas did not always work as intended. Part of the Drained character was hidden by a decorative CSS overlay, and the Stuck sprout remained in its original position when the form changed into the completed plan. I described these specific problems to AI rather than asking it to redesign the entire page. The recorded revisions removed the obstructing overlay and placed the sprout and its caption inside the window frame, my retests showed that the character was visible and the plant remained attached to the frame. AI helped generate alternatives and implement corrections, while I chose the interactions, visual direction, and expected behavior used to evaluate the result. I learned that a decorative element also needs to behave consistently across different interface states. Although these two visual problems were resolved, the current test record does not establish whether the complete experience works equally well with keyboard navigation or on small screens. It also remains uncertain whether other students find the playful elements helpful or distracting, so those would be useful next steps for evaluation.

## Known Limitations

The prototype offers only three focus states, so some students may not find a choice that matches their situation. I kept this limited scope to make the main interaction clear and manageable.

My recorded tests focused on character visibility and the Stuck completion layout. I have not yet completed systematic keyboard, mobile, or cross-browser testing. I also have not tested the experience with other students, so I cannot yet determine whether the playful visuals help them return to studying or become distracting. 
