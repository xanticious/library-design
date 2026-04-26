# Centerville Branch Library — Design Document

> A virtual walkthrough of a neighborhood public library, built in Three.js with React + TypeScript.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design Philosophy](#2-design-philosophy)
3. [Architecture — Exterior](#3-architecture--exterior)
4. [Architecture — Interior Style](#4-architecture--interior-style)
5. [Floor Plan](#5-floor-plan)
6. [Zone Descriptions](#6-zone-descriptions)
7. [Color Palette & Materials](#7-color-palette--materials)
8. [Lighting Design](#8-lighting-design)
9. [Furniture & Props](#9-furniture--props)
10. [Three.js Technical Design](#10-threejs-technical-design)
11. [FPS Controller](#11-fps-controller)
12. [Interaction System](#12-interaction-system)
13. [Landing Page](#13-landing-page)
14. [Application Architecture](#14-application-architecture)
15. [Technology Stack](#15-technology-stack)
16. [Development Phases](#16-development-phases)

---

## 1. Project Overview

**Name:** Centerville Branch Library  
**Tagline:** "Discover My Library"  
**Type:** Interactive 3D virtual tour — single-page web application  
**Scale:** ~10,000 sq ft single-floor neighborhood public library  
**Location inspiration:** Centerville, Utah

The application opens on a landing page with a cinematic camera slowly drifting through the 3D library scene playing in the background. The user clicks **[Explore]** and is dropped into a first-person walkthrough with full WASD + mouse-look FPS controls. Clickable hotspots on key objects reveal short information panels describing each space and its purpose.

---

## 2. Design Philosophy

### Exterior — Berlin Post-Reunification Neoclassical

Inspired by the **Jordanian Embassy, Berlin (1995)**. Formal, symmetrical, civic. Light limestone plaster facade, tall rectangular windows arranged in a disciplined grid, restrained horizontal banding, low iron perimeter fence, and a formal parapet roofline. The building reads as serious and permanent — a community institution.

### Interior — Warm Modern

Inspired by contemporary residential interior design: natural materials, soft neutral base palette, organic warmth. The Berlin exterior creates contrast with the welcoming, light-filled interior — crossing the threshold is intentionally a moment of arrival. Zones are differentiated by accent color, not by walls, keeping the open-plan legible and navigable.

### Narrative Tension

The exterior says "civic institution." The interior says "come in, stay a while." This contrast is the emotional throughline of the walkthrough experience.

---

## 3. Architecture — Exterior

### Style Reference

Jordanian Embassy, Berlin (1995) — Berlin Post-Reunification Neoclassical.

### Facade

- **Material:** Light limestone plaster, slightly textured, warm off-white (#F0EDE6)
- **Windows:** Tall rectangular double-hung windows, evenly spaced in a 3-bay × 2-row grid on the front elevation. Dark steel frames (#2A2A2A). Slightly recessed with shallow limestone surrounds.
- **Horizontal banding:** Two shallow belt courses divide the facade vertically — one at sill level, one at lintel level.
- **Cornice:** Simple projecting cornice at the parapet with a modest dentil band.
- **Entrance:** Central recessed entrance bay, slightly wider than flanking bays. Three stone steps up to a dark steel-and-glass double door. A projecting flat canopy on brackets shelters the entrance.
- **Signage:** Carved stone lettering above the entrance: `CENTERVILLE PUBLIC LIBRARY`

### Roofline

Flat roof with a solid parapet. No visible mechanical equipment from street level. Parapet coping in slightly darker limestone.

### Exterior Grounds (Welcoming Park-Like)

- **Setback:** ~6m (20 ft) from the street, lawn on either side of the path
- **Path:** Curved concrete path from gate to entrance steps, bordered by low ground cover plantings
- **Perimeter:** Low ornamental iron fence (knee height), matching the entrance gate posts
- **Plantings:** Two medium shade trees flanking the path at midpoint; low ornamental shrubs along the building base
- **Amenities:** Two wooden benches on the lawn, a bike rack near the entrance (right side), a community bulletin board kiosk at the gate (left side)
- **Season:** Rendered in late spring — trees in full leaf, warm directional sunlight from the southwest

---

## 4. Architecture — Interior Style

### Style: Warm Modern

**Walls:** Off-white with subtle warm undertone. Smooth plaster finish.  
**Floors:** Wide-plank light oak hardwood throughout public areas. Polished concrete in staff and utility areas.  
**Ceiling:** Flat painted white, 3.6m (12 ft) height throughout. Exposed ceiling reveals around pendant fixture clusters.  
**Trim:** Warm charcoal steel — door frames, window frames, shelf uprights.  
**Shelving:** Natural oak veneer panel shelving with charcoal steel uprights and brackets.  
**Furniture:** Upholstered seating in warm gray and taupe; reading chairs in bold accent colors (one per zone); study tables in light oak with charcoal legs.

### Zone Color Coding (Accent)

Each major zone has a single accent color applied to signage, one upholstered piece, and zone marker stripe on the floor:

| Zone                                  | Accent Color                   |
| ------------------------------------- | ------------------------------ |
| Adult Collections (Fiction, NF, DVDs) | Bold Red `#C0392B`             |
| Young Adult                           | Deep Teal `#0D7377`            |
| Children's Area                       | Mustard Yellow `#E8B84B`       |
| Computer Area                         | Deep Teal `#0D7377`            |
| Study Rooms                           | Warm Gray (no strong accent)   |
| Community Room                        | Bold Red `#C0392B`             |
| Staff Areas                           | Neutral (not publicly visible) |

---

## 5. Floor Plan

### Building Footprint

**30m × 33m** (≈ 98 ft × 108 ft) = **990 sq m ≈ 10,650 sq ft**  
Single floor. Ceiling height: 3.6m throughout public areas, 3.0m in staff areas.

### Coordinate System (Three.js)

- Origin `(0, 0, 0)` = center of building at floor level
- X-axis: East (+) / West (−)
- Z-axis: South/Front (+) / North/Back (−)
- Y-axis: Up (+)
- 1 unit = 1 meter

### Cardinal Orientation

- **South wall (front):** Main entrance, faces street
- **North wall (back):** Staff areas, service entrance
- **East wall:** Community room, study rooms, restrooms
- **West wall:** Children's area, computer area

---

### Floor Plan Diagram (Top-Down)

```
NORTH (back)
┌─────────────────────────────────────────────────────────────────┐
│  STAFF        │ STAFF       │ STAFF      │ STAFF      │  STUDY  │
│  BREAKROOM    │ MGMT OFFICE │ PROCESSING │ TRANSIT    │  ROOM 1 │
│  5m×6m        │ 4m×6m       │ 6m×6m      │ 5m×6m      │  3.5m×5m│
├───────────────┴─────────────┴────────────┴────────────┤         │
│                                                        │  STUDY  │
│              HOLD SHELF (corridor)                     │  ROOM 2 │
│              ~2m wide staff corridor                   │  3.5m×5m│
├────────────────┬────────────────────┬──────────────────┴─────────┤
│                │                    │                             │
│  CHILDREN'S    │  NON-FICTION       │    COMMUNITY ROOM          │
│  AREA          │  STACKS            │    (auditorium)            │
│  12m × 10m     │  8m × 8m           │    10m × 9m                │
│                │                    │    (partition wall E side) │
│  [TREEHOUSE    │                    │                             │
│   STORYTIME    ├────────────────────┤                             │
│   CORNER NW]   │  YA FICTION        ├─────────────────────────────┤
│                │  6m × 6m           │  RESTROOMS (M/F)            │
│  Children's    │                    │  6m × 4m                   │
│  sub-zones     │                    │                             │
│  along W wall  ├────────────────────┴─────────────────────────────┤
│                │                                                   │
├────────────────┤      ADULT FICTION STACKS                        │
│                │      12m × 8m                                     │
│  COMPUTER AREA │                                                   │
│  8m × 7m       ├────────────────────────────────────────────────── │
│  (12 PCs)      │                                                   │
│                │      READING / STUDY TABLES (open area)          │
│                │      distributed throughout center                │
├────────────────┤                                                   │
│                │                                                   │
│  ADULT DVDs    │            ┌──────────────────┐                  │
│  4m × 4m       │            │  CIRCULATION     │                  │
│                │            │     DESK         │                  │
│                │            │   (central hub)  │                  │
│                │            │   5m × 3m        │                  │
│                │            └──────────────────┘                  │
├────────────────┴────────────────────────────────────────────────── │
│                                                                   │
│           ENTRY / LOBBY   (~8m × 6m)                             │
│           New Books display · Community bulletin board            │
│                                                                   │
└───────────────────────────── SOUTH (entrance) ────────────────────┘
```

### Zone Area Summary

| Zone                        | Approx Area                   |
| --------------------------- | ----------------------------- |
| Entry / Lobby               | 48 sq m (516 sq ft)           |
| Circulation Desk            | 15 sq m (161 sq ft)           |
| Adult Fiction Stacks        | 96 sq m (1,033 sq ft)         |
| Young Adult Fiction         | 36 sq m (387 sq ft)           |
| Non-Fiction Stacks          | 64 sq m (689 sq ft)           |
| Adult DVDs                  | 16 sq m (172 sq ft)           |
| Children's Area (all)       | 120 sq m (1,292 sq ft)        |
| — Children's Fiction        | 30 sq m                       |
| — Children's Non-Fiction    | 24 sq m                       |
| — Board Books               | 16 sq m                       |
| — Children's DVDs           | 12 sq m                       |
| — Storytime / Treehouse     | 38 sq m                       |
| Computer Area (12 PCs)      | 56 sq m (603 sq ft)           |
| Study Room 1                | 17 sq m (183 sq ft)           |
| Study Room 2                | 17 sq m (183 sq ft)           |
| Community Room              | 90 sq m (969 sq ft)           |
| Restrooms                   | 24 sq m (258 sq ft)           |
| Reading Nooks (scattered)   | ~40 sq m (430 sq ft)          |
| Staff Corridor / Hold Shelf | ~30 sq m                      |
| Staff Breakroom             | 30 sq m (323 sq ft)           |
| Staff Management Office     | 24 sq m (258 sq ft)           |
| Staff Processing            | 36 sq m (387 sq ft)           |
| Staff Transit Receive/Send  | 30 sq m (323 sq ft)           |
| **Total**                   | **~989 sq m (~10,650 sq ft)** |

### Key Adjacency Rules

- Circulation desk faces the entry directly — first thing a patron sees
- Children's area is in the NW quadrant, away from computer area noise, accessible without crossing adult stacks
- Computer area is near the entry for quick access, but separated from quiet reading zones
- Community room has a secondary entrance from the lobby AND an internal partition — can be isolated or opened
- Staff areas are behind the circulation desk, invisible from public floor
- Study rooms flank the community room on the east side — quiet zone
- Restrooms are accessible from the main floor without entering staff areas

---

## 6. Zone Descriptions

### Entry / Lobby

The first impression. Double glass doors open to a vestibule with a mat entry. Inside: a "New Arrivals" spinning rack to the left, a community events bulletin board to the right (corkboard in oak frame). The circulation desk is straight ahead and slightly elevated on a low platform. Sight lines open immediately to the full floor.

### Circulation Desk

A 5m curved/angular desk in light oak with a charcoal steel frame. Two workstations (monitors facing staff). Book return slot on the patron-facing side. Hold shelf pickup (A–Z labeled cubbies) is visible through the door behind the desk. The desk is slightly elevated — staff stand at patron eye level.

### Adult Fiction

Parallel rows of double-sided shelving, 4 rows deep, labeled A–Z by author last name. End-cap displays highlight featured titles. Reading nook at the far end: two armchairs in Bold Red flanking a small side table with a floor lamp.

### Young Adult Fiction

Shorter shelving (1.5m high, patron-friendly) in a more casual arrangement. Bright signage. A long low bench runs along the west-facing window for reading. YA graphic novels have their own dedicated end-cap display.

### Non-Fiction

Taller shelving (2.1m), organized by Dewey Decimal. A reference desk stub (no permanent staff) with a single catalog terminal. Study carrels line the north wall.

### Adult DVDs

Low spinning DVD tower racks and flat-shelf cases. Small section, near the YA zone.

### Children's Area

Defined by a change to warmer tones and lower-scale furniture. Entry marked by a painted arch with illustrated animals. Four sub-zones:

- **Children's Fiction:** Low shelves (1.2m), face-out display for picture books, bins for easy browsing
- **Children's Non-Fiction:** Labeled topic sections with colorful spine labels
- **Board Books:** Very low bins and soft floor mats — designed for toddlers
- **Children's DVDs:** Small spinning rack, low level

**Storytime Corner (The Treehouse):**  
The signature landmark of the building. A raised wooden platform (~40cm) with a wood railing and a canopy structure overhead built from natural timber posts and a canvas-draped frame, suggesting a treehouse or forest canopy. String lights woven through the canopy. The platform seats ~20 children on floor cushions. Illustrated woodland mural on the adjacent wall. A librarian's story chair (oversized armchair) faces the children. This is the hero visual of the walkthrough.

### Computer Area

12 individual computer stations in two back-to-back rows of 6, with privacy screens between each station. A shared laser printer/copier station at the end. Stations have charcoal steel legs and white laminate tops. Each monitor is a flat black slab. Overhead, pendant industrial lights hang lower than the main floor — creating a "workshop" sub-zone ambiance.

### Study Rooms

Two enclosed glass-walled rooms (frosted lower half, clear upper half). Each fits a table for 4 and a wall-mounted whiteboard. Dark charcoal framing matches the window system. Accessible via corridor adjacent to the community room.

### Community Room

~90 sq m flexible space. Currently configured with ~60 movable chairs in rows facing a small presentation area with a pull-down projection screen and ceiling-mounted projector. A folding partition wall on the east side can open the room to a secondary lobby / display gallery area. The room is separated from the main floor by a glass wall with double doors.

### Restrooms

Two standard ADA-compliant restrooms (M/F). Accessed from a short corridor on the east side between the community room and study rooms.

### Staff Areas (Not Publicly Accessible)

Behind a door marked "Staff Only" behind the circulation desk:

- **Hold Shelf Corridor:** A wide corridor with labeled shelving cubbies A–Z for patron holds, visible through a window from the circulation desk
- **Transit Receive/Send:** Loading-dock-style workstation, book cart staging area, ILL sorting
- **Processing:** Long workbench for acquisitions (MARC records, cataloging), labeling machine, discard/weeding cart
- **Management Office:** Enclosed office, 1–2 desks, private, glass window overlooking the processing area
- **Staff Breakroom:** Table, chairs, kitchenette (sink, microwave, mini-fridge), lockers, bulletin board

---

## 7. Color Palette & Materials

### Base Palette (Interior Walls, Ceilings, Trim)

| Name        | Hex       | Use                             |
| ----------- | --------- | ------------------------------- |
| Pure White  | `#FAFAF8` | Ceilings, upper walls           |
| Warm Gray   | `#C8C4BC` | Secondary walls, upholstery     |
| Light Taupe | `#C4B49A` | Feature walls, floor cushions   |
| Charcoal    | `#2D2D2D` | Steel frames, door/window trim  |
| Light Oak   | `#D4A96A` | Shelving, desk surfaces, floors |

### Accent Palette (Zone Markers, Signage, Hero Furniture)

| Name           | Hex       | Zone                        |
| -------------- | --------- | --------------------------- |
| Bold Red       | `#C0392B` | Adult zones, Community Room |
| Deep Teal      | `#0D7377` | YA, Computer Area           |
| Mustard Yellow | `#E8B84B` | Children's Area             |

### Exterior Palette

| Name              | Hex       | Use                                 |
| ----------------- | --------- | ----------------------------------- |
| Limestone White   | `#F0EDE6` | Main facade plaster                 |
| Belt Course Stone | `#D8D4CC` | Horizontal banding, cornice         |
| Dark Steel        | `#2A2A2A` | Window frames, entrance door, fence |
| Entrance Steps    | `#C8C4BC` | Stone steps                         |

### Three.js Material Mapping

| Surface        | Three.js Material      | Properties                                             |
| -------------- | ---------------------- | ------------------------------------------------------ |
| Exterior walls | `MeshStandardMaterial` | color `#F0EDE6`, roughness 0.85, metalness 0           |
| Interior walls | `MeshStandardMaterial` | color `#FAFAF8`, roughness 0.9, metalness 0            |
| Oak floor      | `MeshStandardMaterial` | color `#D4A96A`, roughness 0.6, normalMap (wood grain) |
| Glass windows  | `MeshPhysicalMaterial` | transmission 0.95, roughness 0.05, color `#C8E8F0`     |
| Steel frames   | `MeshStandardMaterial` | color `#2D2D2D`, roughness 0.3, metalness 0.8          |
| Shelving oak   | `MeshStandardMaterial` | color `#D4A96A`, roughness 0.7                         |

---

## 8. Lighting Design

### Philosophy

Mixed lighting: daylight from tall exterior windows provides the ambient base; pendant fixtures and floor lamps provide warm task lighting over key zones.

### Natural Light Sources (Three.js `DirectionalLight`)

- **Primary sun:** DirectionalLight, color `#FFF5E0`, intensity 2.0, position southwest, casts soft shadows
- **Sky ambient:** AmbientLight, color `#B8C8D8`, intensity 0.4 (cool sky fill for shadow areas)
- **Window bounce:** PointLights placed just inside each south/east/west window, warm white `#FFF0D0`, low intensity 0.3, simulating light spill from windows

### Interior Fixtures (Three.js `PointLight`)

| Zone                   | Fixture Type                 | Color     | Intensity | Notes                       |
| ---------------------- | ---------------------------- | --------- | --------- | --------------------------- |
| Circulation Desk       | Pendant cluster (3 pendants) | `#FFE8C0` | 1.5       | Hero light, warm            |
| Reading Tables         | Pendant row                  | `#FFE8C0` | 1.0       | Over each table             |
| Computer Area          | Industrial pendant row       | `#F0F8FF` | 1.2       | Cooler, task light          |
| Children's / Treehouse | String lights in canopy      | `#FFD080` | 0.8       | Very warm, fairy-light feel |
| Study Rooms            | Recessed ceiling             | `#FFF5E0` | 1.0       | Even, functional            |
| Community Room         | Track lighting               | `#FFFFFF` | 1.5       | Presentation-ready          |
| Staff Areas            | Fluorescent strip (cool)     | `#E8F0FF` | 1.0       | Functional                  |

### Shadow Strategy

- Enable `castShadow` / `receiveShadow` on DirectionalLight and key PointLights
- Shelving units cast shadow rows on the floor — a key atmospheric detail
- Treehouse canopy casts dappled shadow pattern on the storytime floor

---

## 9. Furniture & Props

### Procurement Strategy

**Hybrid:** Building shell is procedural (Three.js geometry). Key props are GLTF models sourced from free libraries (Poly Haven, Sketchfab CC0, KenneyNL).

### Procedural (Built in Code)

| Element                | Geometry                               |
| ---------------------- | -------------------------------------- |
| Walls, floors, ceiling | `BoxGeometry`                          |
| Windows                | `BoxGeometry` + `MeshPhysicalMaterial` |
| Exterior steps         | Stacked `BoxGeometry`                  |
| Iron fence posts       | `CylinderGeometry`                     |
| Fence rails            | `CylinderGeometry`                     |
| Shelving uprights      | `BoxGeometry`                          |
| Shelving shelves       | `BoxGeometry`                          |
| Study carrels          | `BoxGeometry` compositions             |
| Computer desk surfaces | `BoxGeometry`                          |
| Circulation desk       | `BoxGeometry` composition              |
| Treehouse platform     | `BoxGeometry`                          |
| Treehouse posts        | `CylinderGeometry`                     |
| Treehouse canopy frame | `CylinderGeometry` rails               |
| Computer monitors      | `BoxGeometry` (screen + stand)         |
| Doors                  | `BoxGeometry`                          |
| Bulletin boards        | `PlaneGeometry`                        |
| Projection screen      | `PlaneGeometry`                        |

### GLTF Assets (Sourced)

| Prop                             | Source                       | Zone                 |
| -------------------------------- | ---------------------------- | -------------------- |
| Armchairs (reading nooks)        | Poly Haven / Sketchfab CC0   | Adult Fiction, Lobby |
| Books on shelves (instanced)     | KenneyNL book pack           | All stacks           |
| Story chair (oversized armchair) | Poly Haven                   | Storytime            |
| Floor cushions                   | Sketchfab CC0                | Storytime            |
| Potted plants                    | Sketchfab CC0                | Lobby, Children's    |
| Bench (exterior)                 | KenneyNL                     | Exterior grounds     |
| Bike rack                        | Sketchfab CC0                | Exterior             |
| Trees (exterior)                 | Three.js `LOD` tree          | Grounds              |
| Pendant light fixtures           | Procedural or Sketchfab      | Various              |
| Book carts                       | Procedural (box composition) | Staff area           |

### Book Instancing Strategy

Books are the most numerous prop. Use `InstancedMesh` with randomized spine colors (`#C0392B`, `#0D7377`, `#E8B84B`, `#2D2D2D`, `#8B5E3C`, `#5C8A5C`) to populate shelves efficiently. Each shelf row = one `InstancedMesh` call.

---

## 10. Three.js Technical Design

### Dependencies

```
three           ^0.175.x      Core renderer
@types/three    ^0.175.x      TypeScript definitions
```

Three.js is not in the pre-approved library list; it must be added to `package.json`.

### Scene Structure

```
Scene
├── ExteriorGroup
│   ├── Building shell (facade walls, roof, parapet)
│   ├── Exterior steps
│   ├── Iron fence
│   ├── Pathway
│   ├── Trees (LOD)
│   ├── Benches
│   └── Bike rack
├── InteriorGroup
│   ├── Floors (oak)
│   ├── Interior walls (zone dividers, partial walls)
│   ├── Ceiling
│   ├── Windows (glass planes)
│   ├── ZoneGroups
│   │   ├── EntryZone
│   │   ├── CirculationZone
│   │   ├── AdultFictionZone
│   │   ├── YAZone
│   │   ├── NonFictionZone
│   │   ├── DVDZone
│   │   ├── ChildrensZone
│   │   │   └── TreehouseGroup
│   │   ├── ComputerZone
│   │   ├── StudyRooms
│   │   ├── CommunityRoom
│   │   └── StaffZone
│   └── LightingGroup
│       ├── DirectionalLight (sun)
│       ├── AmbientLight (sky)
│       └── PointLights[] (interior fixtures)
└── HotspotGroup (invisible raycasting targets)
```

### Module Organization

```
src/
  three/
    scene.ts            Scene setup, renderer, camera, resize handler
    controls.ts         FPS pointer-lock controls (WASD + mouse)
    world/
      exterior.ts       Exterior building geometry builder
      interior.ts       Interior shell (floors, walls, ceiling)
      zones/
        entry.ts
        circulation.ts
        adultFiction.ts
        youngAdult.ts
        nonFiction.ts
        dvd.ts
        childrens.ts    Includes treehouse builder
        computers.ts
        studyRooms.ts
        communityRoom.ts
        staff.ts
      lighting.ts       All light setup
      props/
        shelving.ts     Parametric shelf builder
        books.ts        InstancedMesh book population
        furniture.ts    Desk, chair compositions
        treehouse.ts    Treehouse canopy geometry
    hotspots.ts         Raycasting hotspot registry
    cinematicCamera.ts  Landing page camera path (CatmullRomCurve3)
    loaders.ts          GLTFLoader, TextureLoader wrappers
```

### Renderer Setup

```typescript
renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
```

### Camera

- **FPS mode:** `PerspectiveCamera`, FOV 75°, near 0.1, far 200
- **Cinematic mode:** Same camera, driven by a `CatmullRomCurve3` path, auto-advancing via `clock.getDelta()`

### Performance Strategy

- `InstancedMesh` for books and fence posts
- LOD trees for exterior (low-poly beyond 20m)
- Frustum culling is automatic via Three.js
- Shadow map resolution: 2048 for DirectionalLight, 512 for PointLights
- Texture compression: use `.ktx2` via `KTX2Loader` for floor wood grain normals
- Lazy-load GLTF assets only when player enters zone proximity (within 15m)

---

## 11. FPS Controller

### Implementation

Custom controller using the **Pointer Lock API** (`document.requestPointerLock()`). No dependency on `PointerLockControls` from Three.js examples — implement directly for full TypeScript control.

### Controls

| Input               | Action                                  |
| ------------------- | --------------------------------------- |
| `W` / Arrow Up      | Move forward                            |
| `S` / Arrow Down    | Move backward                           |
| `A` / Arrow Left    | Strafe left                             |
| `D` / Arrow Right   | Strafe right                            |
| Mouse move X        | Yaw (look left/right)                   |
| Mouse move Y        | Pitch (look up/down), clamped ±80°      |
| `Escape`            | Exit pointer lock, pause, return to HUD |
| Click (when locked) | Fire hotspot raycast                    |

### Player Properties

```typescript
const PLAYER_HEIGHT = 1.7; // meters (eye level)
const PLAYER_SPEED = 4.0; // m/s walk speed
const MOUSE_SENSITIVITY = 0.002; // radians per pixel
const PITCH_CLAMP = 80; // degrees
```

### Collision Detection

AABB collision against a static list of wall and furniture bounding boxes. On each frame:

1. Compute next position from input velocity
2. Test against each collidable AABB
3. Project velocity to slide along walls (don't stop dead)
4. Apply gravity = 0 (no jumping — it's a library)

### Spawn Point

Player spawns just inside the main entrance doors, facing north toward the circulation desk. Position: `(0, 1.7, 12)`.

---

## 12. Interaction System

### Hotspots

Invisible `Mesh` objects (flat planes) placed on interactive surfaces. Each hotspot has metadata:

```typescript
interface Hotspot {
  id: string;
  title: string;
  body: string; // 1–3 sentence description
  position: Vector3; // world position of label anchor
  mesh: Mesh; // invisible raycasting target
}
```

### Hotspot Registry

| ID                 | Location            | Title             | Description                                                                                                                    |
| ------------------ | ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `circulation-desk` | Circulation desk    | Circulation Desk  | Check out books, return materials, and ask staff for help finding anything in the collection.                                  |
| `adult-fiction`    | Fiction stacks      | Adult Fiction     | Over 8,000 titles organized A–Z by author. Reading nooks at the far end offer a quiet escape.                                  |
| `ya-section`       | YA shelving         | Young Adult       | New releases, graphic novels, and series fiction for teen readers. Low shelving keeps it welcoming.                            |
| `nonfiction`       | NF stacks           | Non-Fiction       | Dewey Decimal classification, 000–999. A catalog terminal at the reference stub can help you locate any title.                 |
| `childrens-entry`  | Children's arch     | Children's Area   | A dedicated world for young readers, from board books for toddlers to chapter books for confident readers.                     |
| `treehouse`        | Storytime platform  | Story Time Corner | The heart of the Children's Area. Story time is held here every Tuesday and Thursday morning.                                  |
| `computers`        | Computer row        | Computer Lab      | 12 public internet terminals, printing, and scanning. Sessions are 60 minutes with a 15-minute extension if no one is waiting. |
| `study-room-1`     | Study room door     | Study Room        | Glass-walled quiet study rooms for individuals or small groups. Reserve at the circulation desk.                               |
| `community-room`   | Community room door | Community Room    | A 900 sq ft flexible meeting space for author talks, classes, and community events. Seats up to 60.                            |
| `new-arrivals`     | Entry display rack  | New Arrivals      | Just added to the collection this month — fiction, non-fiction, DVDs, and audiobooks.                                          |
| `hold-shelf`       | Hold shelf window   | Hold Shelf        | Items requested online or by phone are held here for 7 days. Pickup is alphabetical by last name.                              |

### Raycasting

On each click (while pointer-locked):

```typescript
raycaster.setFromCamera({ x: 0, y: 0 }, camera); // crosshair = screen center
const hits = raycaster.intersectObjects(hotspotMeshes);
if (hits.length > 0) showInfoPanel(hits[0].object.userData.hotspotId);
```

### Info Panel UI

A React overlay component. Appears centered on screen. Contains:

- Zone accent color top bar
- Title (large, serif)
- Body text (small, sans-serif)
- `[Close]` button or press `E` / `Escape`

While the panel is open, mouse look is paused (pointer lock released temporarily).

---

## 13. Landing Page

### Layout

Full viewport. The Three.js canvas fills 100% of the screen. React overlay rendered on top via `position: absolute`.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         [3D scene playing behind — cinematic drift]     │
│                                                         │
│                                                         │
│              Discover My Library                        │
│                                                         │
│                    [ Explore ]                          │
│                                                         │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Typography

- **"Discover My Library"** — large serif typeface (Georgia or a Google Font like Playfair Display), white, subtle text-shadow for legibility over the 3D scene
- **[Explore]** — clean sans-serif button, Bold Red `#C0392B` background, white text, slight border radius

### Cinematic Camera Path

A `CatmullRomCurve3` path winds slowly through the library interior:

1. Start outside, approaching the entrance (exterior approach shot)
2. Drift through the entrance doors
3. Slow pan left revealing the circulation desk
4. Track toward the Children's Area, revealing the treehouse canopy
5. Gentle arc back through the reading tables toward the computer area
6. Settle facing the front windows with warm light pouring in

Speed: ~3 m/s, total path length ~60m, ~20 second loop. The camera bobs gently via a sine wave on Y (`+= sin(t * 0.5) * 0.02`).

### Transition to FPS Mode

1. User clicks **[Explore]**
2. React overlay fades out (CSS transition, 500ms)
3. Cinematic camera motion stops
4. Camera teleports to spawn point `(0, 1.7, 12)`, facing north
5. `document.requestPointerLock()` is called
6. FPS controls activate
7. Subtle crosshair `+` appears in screen center

### UI Overlay During FPS Mode

Minimal HUD:

- Crosshair `+` (centered, CSS)
- Zone label (bottom left): fades in when entering a new zone, shows zone name for 3 seconds
- `[ESC]` hint (bottom right, small): "Press ESC to pause"

---

## 14. Application Architecture

### Component Tree

```
<App>
  ├── <LandingPage>        (shown when appState = 'landing')
  │   ├── <ThreeCanvas>    (Three.js canvas, always mounted)
  │   └── <LandingOverlay> (title + Explore button)
  └── <ExploreView>        (shown when appState = 'exploring')
      ├── <ThreeCanvas>    (same instance, no remount)
      ├── <Crosshair>
      ├── <ZoneLabel>
      └── <InfoPanel>      (shown when hotspot is active)
```

### XState State Machine

```typescript
// appMachine
type AppState =
  | "landing" // cinematic camera running, overlay visible
  | "transitioning" // fade out overlay, teleport camera
  | "exploring" // FPS active
  | "hotspot" // FPS paused, info panel open
  | "paused"; // ESC pressed, pointer lock released
```

**Events:**

- `EXPLORE_CLICKED` → `landing` → `transitioning` → `exploring`
- `HOTSPOT_CLICKED` (with hotspotId) → `exploring` → `hotspot`
- `CLOSE_PANEL` → `hotspot` → `exploring`
- `ESCAPE_PRESSED` → `exploring` → `paused`
- `RESUME` → `paused` → `exploring`

### Data Flow

```
XState appMachine
  ↕ (state, send)
React components (useActor hook)
  ↕ (imperative refs)
Three.js scene (controls.ts, cinematicCamera.ts)
```

The Three.js scene is **imperative** (not React-driven). React only passes mode signals to it via refs or a thin adapter. The scene renders in its own `requestAnimationFrame` loop regardless of React render cycles.

---

## 15. Technology Stack

### Core

| Package         | Version | Purpose                |
| --------------- | ------- | ---------------------- |
| `react`         | ^19     | UI framework           |
| `typescript`    | ^5      | Type safety            |
| `vite`          | ^6      | Build tool             |
| `three`         | ^0.175  | 3D rendering           |
| `@types/three`  | ^0.175  | Three.js types         |
| `xstate`        | ^5      | App state machine      |
| `@xstate/react` | ^5      | React hooks for XState |

### Dev & Testing

| Package  | Purpose      |
| -------- | ------------ |
| `vitest` | Unit testing |
| `oxlint` | Linting      |
| `oxfmt`  | Formatting   |

### Three.js Addons (from `three/addons/`)

| Addon        | Purpose                             |
| ------------ | ----------------------------------- |
| `GLTFLoader` | Load GLTF/GLB prop assets           |
| `KTX2Loader` | Compressed texture loading          |
| `RGBELoader` | HDR environment map for reflections |

### Fonts

- **Playfair Display** (Google Fonts) — landing page title
- **Inter** (Google Fonts) — UI, info panels, zone labels

---

## 16. Development Phases

### Phase 1 — Foundation (Week 1)

- [ ] Remove scaffold example components (`Counter`, `PixiExample`, `FontExamples`)
- [ ] Install `three` and `@types/three`
- [ ] Set up Three.js canvas component (renderer, camera, resize handler, RAF loop)
- [ ] Implement XState `appMachine`
- [ ] Build landing page overlay (title + Explore button, static background)
- [ ] Implement pointer lock FPS controller (WASD + mouse look)

### Phase 2 — Building Shell (Week 2)

- [ ] Build exterior facade geometry (walls, windows, parapet, steps)
- [ ] Build exterior grounds (path, fence, lawn plane)
- [ ] Build interior floor, ceiling, and exterior wall openings
- [ ] Implement zone boundary walls and partial dividers
- [ ] Set up DirectionalLight (sun) + AmbientLight + window PointLights

### Phase 3 — Interior Zones (Week 3)

- [ ] Circulation desk geometry
- [ ] Shelving system (parametric shelf builder)
- [ ] Book `InstancedMesh` population
- [ ] Computer area (desks, monitors)
- [ ] Study rooms (glass walls, doors)
- [ ] Community room (chairs, partition wall, screen)
- [ ] Restrooms (closed doors)
- [ ] Staff area (behind-the-scenes, basic geometry)

### Phase 4 — Children's Area & Hero Moments (Week 4)

- [ ] Children's arch entry
- [ ] Low children's shelving
- [ ] Board book bins
- [ ] Treehouse platform and canopy structure
- [ ] Treehouse string lights (PointLight array + geometry)
- [ ] Woodland mural (PlaneGeometry + texture)
- [ ] Story chair (GLTF or procedural)

### Phase 5 — Polish & Interaction (Week 5)

- [ ] GLTF prop loading (armchairs, plants, exterior benches, bike rack)
- [ ] Interior pendant light fixtures (geometry + PointLights)
- [ ] Hotspot system (raycasting + registry)
- [ ] Info panel React component
- [ ] Zone label HUD (proximity detection)
- [ ] AABB collision detection

### Phase 6 — Landing Page & Cinematic Camera (Week 6)

- [ ] Cinematic camera path (`CatmullRomCurve3`)
- [ ] Landing overlay with Playfair Display font
- [ ] Transition animation (fade + teleport + pointer lock)
- [ ] Subtle camera bob during cinematic
- [ ] Final lighting pass and tone mapping tuning

### Phase 7 — QA & Deployment (Week 7)

- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile fallback message (FPS controls require mouse — show graceful message on touch devices)
- [ ] Performance profiling (target 60fps on mid-range hardware)
- [ ] Vite base path configuration for GitHub Pages deployment
- [ ] Final asset optimization (compressed textures, GLB file sizes)
- [ ] Deploy to GitHub Pages

---

## Appendix A — Spatial Coordinates Reference

Key world positions for Three.js scene construction (1 unit = 1 meter, origin = building center at floor):

| Location                  | X   | Y   | Z    | Notes               |
| ------------------------- | --- | --- | ---- | ------------------- |
| Building center           | 0   | 0   | 0    |                     |
| Front entrance (exterior) | 0   | 0   | 16.5 | South wall exterior |
| Front entrance (interior) | 0   | 0   | 14.5 | Just inside doors   |
| Player spawn              | 0   | 1.7 | 12   | Facing north        |
| Circulation desk          | 0   | 0   | 6    | Center of desk      |
| Children's area center    | −10 | 0   | −2   | NW quadrant         |
| Treehouse center          | −12 | 0   | −8   | NW corner           |
| Computer area center      | −10 | 0   | 6    | W side, mid-depth   |
| Community room center     | 10  | 0   | −5   | NE quadrant         |
| Study room 1              | 12  | 0   | 2    | E side              |
| Study room 2              | 12  | 0   | −4   | E side              |
| Staff area center         | 0   | 0   | −13  | North strip         |

---

_Document version 1.0 — April 25, 2026_
