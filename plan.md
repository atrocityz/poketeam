## Goals
1. Complete Pokémon page with full statistics.
2. Implement user Pokémon team feature:
   - Store user teams in PostgreSQL.
   - Limit team to a maximum of 6 Pokémon.
3. Create Team page:
   - Display user's saved Pokémon team.
   - Allow CRUD operations on team (add/remove Pokémon).

## Tasks Breakdown

### 1. Complete Pokémon Statistics
+ Define the data structure for detailed Pokémon statistics.
+ Fetch and display full statistics on the Pokémon page.
+ Design UI components to neatly show stats.

### 2. User Pokémon Team Storage
+ Design PostgreSQL schema to store user teams:
  + User table (already existing).
  + Team table linking user_id to up to 6 Pokémon ids.
+ Implement backend API endpoints:
  + GET user team.
  + PUT add or delete Pokémon to team.
+ Ensure authorization and validation (max 6 Pokémon).

### 3. Team Page Implementation
+ Frontend page to display user's Pokémon team.
- Show each Pokémon with summary info.
+ Add controls to add or remove Pokémon.
- Handle empty team state gracefully.
+ Integrate with backend API for team management.

## Optional/Next Steps
- Show combined stats or team summary.
- Enhance UI with animations or better visuals.
