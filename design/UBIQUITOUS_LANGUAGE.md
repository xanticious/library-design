# Ubiquitous Language

> Canonical terms for the Centerville Branch Library virtual walkthrough project.
> Use these terms consistently in code, comments, PR descriptions, and conversation.

---

## The Building

| Term            | Definition                                                                                                                                                                                                   | Aliases to avoid                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| **Branch**      | The single physical library building and its grounds — the entire subject of the 3D environment.                                                                                                             | Library building, facility             |
| **Grounds**     | The outdoor area within the perimeter fence: the approach path, lawn, benches, bike rack, and bulletin board kiosk.                                                                                          | Exterior, yard, campus                 |
| **Approach**    | The curved path from the gate to the entrance steps that a visitor walks to enter the Branch.                                                                                                                | Walkway, driveway                      |
| **Facade**      | The exterior front-facing surface of the Branch — limestone plaster, windows, cornice, and entrance bay.                                                                                                     | Front face, exterior wall              |
| **Entrance**    | The double glass doors at the south wall, reached via the Approach. The threshold between Grounds and the interior.                                                                                          | Entry doors, front door, foyer         |
| **Lobby**       | The interior vestibule immediately inside the Entrance, containing the New Arrivals display and community bulletin board.                                                                                    | Foyer, vestibule, reception area       |
| **Zone**        | A named, bounded area of the interior floor dedicated to a specific use (e.g. Children's Area, Computer Area). Zones are open-plan — defined by furniture, signage, and accent color rather than full walls. | Section, room, area, department        |
| **Public Area** | Any Zone accessible to Patrons without staff authorization.                                                                                                                                                  | Public floor, patron area              |
| **Staff Area**  | The restricted rear portion of the Branch behind the Circulation Desk, inaccessible to Patrons.                                                                                                              | Back office, staff room, back of house |

---

## Spaces & Zones

| Term                 | Definition                                                                                                                                                | Aliases to avoid                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Circulation Desk** | The central service counter where Patrons check out and return Materials, pick up Holds, and ask for help. The anchor of the open-plan floor.             | Front desk, reference desk, checkout counter, service desk |
| **Stacks**           | Rows of shelving units that house the circulating collection. "The Stacks" refers to Adult Fiction, Non-Fiction, and YA collectively.                     | Shelves, book area                                         |
| **Children's Area**  | The Zone in the NW quadrant of the floor dedicated to materials and services for children and toddlers. Contains four sub-zones and the Storytime Corner. | Kids' section, children's section, children's room         |
| **Storytime Corner** | The dedicated space within the Children's Area featuring the Treehouse structure, floor cushions, and a story chair for live reading events.              | Treehouse corner, story area, reading corner               |
| **Treehouse**        | The physical landmark structure — a raised platform with timber posts, a canopy frame, and string lights — that defines the Storytime Corner.             | Treehouse corner, canopy structure                         |
| **Computer Area**    | The Zone containing 12 public internet terminals, privacy screens, and a shared printer/copier.                                                           | Computer lab, computer room, internet area                 |
| **Study Room**       | Either of the two enclosed glass-walled rooms for quiet individual or small-group study, reservable at the Circulation Desk.                              | Study space, meeting room, quiet room                      |
| **Community Room**   | The flexible ~90 sq m multipurpose room on the east side, separated from the main floor by a glass wall and openable partition. Seats up to 60.           | Auditorium, meeting room, event space, lecture hall        |
| **Reading Nook**     | One of several armchair groupings scattered through the Public Area for casual, informal reading.                                                         | Reading corner, lounge area                                |
| **Hold Shelf**       | The A–Z labeled cubbies in the Staff Area where items requested by Patrons await pickup. Visible through a window from the Circulation Desk.              | Reserves shelf, pickup shelf                               |
| **Transit Area**     | The staff workspace for receiving incoming and sending outgoing Transits — sorting book carts, ILL items, and inter-branch transfers.                     | Receiving area, shipping area, dock                        |
| **Processing Room**  | The staff workroom for Acquisitions: MARC cataloging, spine labeling, and Weeding.                                                                        | Cataloging room, tech services, acquisitions room          |

---

## The Collection

| Term              | Definition                                                                                                                        | Aliases to avoid                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Collection**    | The entirety of Materials owned by the Branch and available to Patrons.                                                           | Library, inventory, catalog                  |
| **Material**      | Any single loanable or reference item in the Collection — a book, DVD, board book, or audiobook.                                  | Item, resource, object, asset                |
| **Title**         | A distinct work in the Collection, independent of the number of physical copies.                                                  | Book (when used generically), resource       |
| **New Arrivals**  | Materials added to the Collection in the current month, displayed on the spinning rack in the Lobby.                              | New books, new releases, recent additions    |
| **Hold**          | A reservation placed by a Patron for a specific Title, fulfilled when a copy becomes available and set aside on the Hold Shelf.   | Reserve, request                             |
| **Transit**       | A Material physically moving between branches via the inter-branch delivery system — either inbound (receive) or outbound (send). | Transfer, ILL (ILL is a specific subset)     |
| **ILL**           | Interlibrary Loan — a Material borrowed from or lent to a library outside the system, processed in the Transit Area.              | Transfer (ILL is a distinct type of Transit) |
| **Acquisitions**  | The workflow for adding new Titles to the Collection: ordering, receiving, MARC cataloging, labeling, and shelving.               | Purchasing, ordering                         |
| **Weeding**       | The deliberate removal of outdated, damaged, or low-use Materials from the Collection.                                            | Discard, culling, deaccessioning             |
| **Dewey Decimal** | The classification system applied to Non-Fiction Materials, organizing them by subject from 000–999.                              | DDC, call number system                      |

---

## People

| Term          | Definition                                                                                                                                   | Aliases to avoid                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Patron**    | A member of the public who uses the Branch's services and spaces.                                                                            | User, customer, visitor, guest, member                          |
| **Staff**     | An employee of the Branch, authorized to access Staff Areas and operate the Circulation Desk.                                                | Employee, librarian (use Librarian for a specific role), worker |
| **Librarian** | A credentialed Staff member with a library science qualification, typically responsible for collection development, reference, and programs. | Staff (when specifically a credentialed librarian)              |

---

## 3D Environment

| Term                 | Definition                                                                                                                               | Aliases to avoid                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Scene**            | The Three.js `Scene` object — the root container for all 3D geometry, lights, and hotspot meshes.                                        | World, environment, level                   |
| **Walkthrough**      | The interactive FPS experience of navigating the 3D Branch. The primary mode of the application.                                         | Tour, game, experience                      |
| **Cinematic Camera** | The automated camera path that plays in the background during the Landing Page, drifting through the Branch on a pre-defined curve.      | Attract screen, fly-through, preview camera |
| **FPS Controller**   | The first-person WASD + mouse-look input system that drives the player camera during a Walkthrough.                                      | Player controller, character controller     |
| **Player**           | The first-person camera viewpoint navigating the Scene during a Walkthrough. There is no visible avatar.                                 | Character, user, camera                     |
| **Spawn Point**      | The fixed world position where the Player begins a Walkthrough — just inside the Entrance, facing the Circulation Desk.                  | Start position, origin                      |
| **Hotspot**          | An invisible mesh in the Scene that, when clicked by the Player, triggers an Info Panel describing the nearby Zone or object.            | Trigger, interactive object, click target   |
| **Info Panel**       | The React UI overlay that appears when a Hotspot is activated, displaying a Zone title and a short description.                          | Tooltip, popup, information card, modal     |
| **Zone Label**       | The HUD element that fades in at the bottom-left of the screen when the Player enters a new Zone, showing the Zone's name for 3 seconds. | Zone name, waypoint label                   |

---

## Relationships

- A **Branch** contains many **Zones**; each **Zone** belongs to exactly one **Branch**.
- A **Zone** is either a **Public Area** or a **Staff Area** — never both.
- The **Children's Area** is a **Zone** that contains the **Storytime Corner** as a named sub-zone; the **Storytime Corner** contains exactly one **Treehouse**.
- A **Community Room** is a **Zone** that can be physically separated from the main **Public Area** by closing its partition wall.
- A **Hold** belongs to exactly one **Patron** and references exactly one **Title**; it is physically located on the **Hold Shelf** until picked up or expired.
- A **Transit** is either inbound (receive) or outbound (send) and is processed in the **Transit Area**.
- An **ILL** is a specialized **Transit** involving a library outside the Branch's system.
- Each **Hotspot** is positioned within exactly one **Zone** and surfaces one **Info Panel**.
- The **Cinematic Camera** is active during the Landing Page state; the **FPS Controller** is active during the Walkthrough state — they are mutually exclusive.

---

## Example Dialogue

> **Dev:** "When the **Player** clicks the desk, which **Hotspot** fires — the one for the **Circulation Desk** or the one for the **Hold Shelf**?"
>
> **Domain expert:** "Those are two separate things. The **Circulation Desk** is what **Patrons** interact with — checking out **Materials**, asking questions. The **Hold Shelf** is staff-facing, in the **Staff Area** behind it. The **Patron** can see the **Hold Shelf** through a window but can't reach it. The **Hotspot** on the desk belongs to the **Circulation Desk** Zone."
>
> **Dev:** "Got it. And the **Community Room** — is it a **Zone** the same way **Adult Fiction** is a **Zone**?"
>
> **Domain expert:** "Yes, but it's a bounded room, not open-plan **Stacks**. When the partition wall is closed, it's a fully separate space inside the **Branch**. We still call it a **Zone** — just one with walls."
>
> **Dev:** "What about the **Treehouse** — is that its own **Zone**?"
>
> **Domain expert:** "No. The **Treehouse** is a physical structure within the **Storytime Corner**, which is a named sub-zone inside the **Children's Area**. The **Children's Area** is the **Zone**. The **Treehouse** is a landmark prop within it — like a reading nook is a furniture grouping, not a Zone."

---

## Flagged Ambiguities

- **"Auditorium" vs "Community Room"** — used interchangeably in early conversation. Canonical term is **Community Room**. "Auditorium" implies fixed tiered seating, which was explicitly rejected (the space has movable chairs). Avoid "auditorium" in code and UI copy.

- **"Zone" vs "Section" vs "Area"** — all three appeared in conversation for the same concept. Canonical term is **Zone** for code and documentation. "Area" survives only in proper names that are already established (e.g. "Children's Area" is the official Zone name). Avoid "section" and "department" entirely.

- **"Computer Area" vs "Computer Lab"** — the floor plan uses "Computer Area" and the Hotspot registry uses "Computer Lab". Canonical Zone name is **Computer Area**. The Hotspot `title` (user-visible string) may say "Computer Lab" as natural language, but the Zone ID and code references must use `computer-area`.

- **"Storytime" vs "Story Time"** — appears both ways in the document. Canonical spelling is **Storytime** (one word), matching library industry convention (ALA style).

- **"Patron" vs "User"** — "User" appears in technical contexts (XState machine, React state). In domain language, the person using the library is always a **Patron**. "User" is reserved strictly for authentication/session concepts at the system boundary (if they arise). Do not use "user" to refer to a person visiting the library.

- **"Hold Shelf" (patron-facing concept) vs "Hold Shelf Corridor" (physical staff-area room)** — the Patron-facing concept is the **Hold Shelf** (the pickup service). The physical room in the Staff Area is the **Hold Shelf Corridor** in the floor plan. In user-facing copy and Hotspot text, always say **Hold Shelf**.
