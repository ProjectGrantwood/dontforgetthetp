///////////////////////////////////////////////
//////////////////// USERS ////////////////////
///////////////////////////////////////////////

export const usersSeed = [
    
  {
    user_id: '8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a',
    email: 'alice@example.com',
    hashed_password: '$2a$12$5QxQxZuzD1fXQx6PZyEwneSziEoGXeEov16x3Re9QfWjQxkDFT4Km', // bcrypt hash for "password123"
  },
  
  {
    user_id: 'b8b38a32-4513-4c1c-915b-126efba9dbe2',
    email: 'bob@example.com',
    hashed_password: '$2a$12$5QxQxZuzD1fXQx6PZyEwneSziEoGXeEov16x3Re9QfWjQxkDFT4Km',
  },
  
  {
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61',
    email: 'carol@example.com',
    hashed_password: '$2a$12$5QxQxZuzD1fXQx6PZyEwneSziEoGXeEov16x3Re9QfWjQxkDFT4Km',
  },
  
  {
    user_id: 'a1f1b42b-9c2b-4d74-bc9c-94cbf6ee1f9b',
    email: 'dave@example.com',
    hashed_password: '$2a$12$5QxQxZuzD1fXQx6PZyEwneSziEoGXeEov16x3Re9QfWjQxkDFT4Km',
  },
  
  {
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81',
    email: 'eve@example.com',
    hashed_password: '$2a$12$5QxQxZuzD1fXQx6PZyEwneSziEoGXeEov16x3Re9QfWjQxkDFT4Km',
  },
  
];

////////////////////////////////////////////////////////
//////////////////// SHOPPING LISTS ////////////////////
////////////////////////////////////////////////////////

export const shoppingListsSeed = [
  // Alice
  {
    list_id: 'f91a0a1a-d91b-4e83-bb54-ec91e6a9af11',
    list_name: 'Weekly Groceries',
    list_notes: 'Typical weekend grocery run — check pantry first.',
    is_public: true,
  },
  {
    list_id: 'a912e6a4-52b1-45c0-bdb4-79e4a3f4589f',
    list_name: 'Camping Supplies',
    list_notes: 'Bring reusable utensils and avoid glass containers.',
    is_public: true,
  },

  // Bob
  {
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53',
    list_name: 'Meal Prep List',
    list_notes: 'Focus on high-protein and quick-cook items.',
    is_public: true,
  },

  // Carol
  {
    list_id: 'c3eeb21e-15a0-43a4-9b6d-7c2f84e5b91f',
    list_name: 'Party Shopping',
    list_notes: 'Need supplies for around 15 guests.',
    is_public: true,
  },
  {
    list_id: '1a7a7c62-02e2-41a2-9f5e-620eb6df7b02',
    list_name: 'Office Supplies',
    list_notes: null,
    is_public: true,
  },

  // Dave
  {
    list_id: '6a7f021d-d08c-4b71-a7a0-2b7d32ef8ac3',
    list_name: 'Home Improvement List',
    list_notes: 'Weekend garage reorganization project.',
    is_public: true,
  },

  // Eve
  {
    list_id: 'b92b621a-6133-4c93-a5c4-50ebf2b936a7',
    list_name: 'Holiday Gifts',
    list_notes: 'Remember gift receipts and wrapping supplies.',
    is_public: true,
  },
  {
    list_id: '85ccbd1b-3b9d-4ac7-b1c3-5031d8c65ef9',
    list_name: 'Groceries – Organic Only',
    list_notes: null,
    is_public: true,
  },
];

/////////////////////////////////////////////////////////////
//////////////////// USER ITEM TEMPLATES ////////////////////
/////////////////////////////////////////////////////////////

export const userItemTemplatesSeed = [
  // Alice (8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a)
  {
    item_template_id: '111a2b3c-4d5e-46f7-8901-23456789a001',
    user_id: '8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a',
    item_name: 'Whole Wheat Bread Rolls',
    default_units: 'packs',
    is_global: false,
  },
  {
    item_template_id: '111a2b3c-4d5e-46f7-8901-23456789a002',
    user_id: '8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a',
    item_name: 'Trail Mix',
    default_units: 'bags',
    is_global: false,
  },
  {
    item_template_id: '111a2b3c-4d5e-46f7-8901-23456789a003',
    user_id: '8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a',
    item_name: 'Marshmallows for S’mores',
    default_units: 'bags',
    is_global: false,
  },
  {
    item_template_id: '111a2b3c-4d5e-46f7-8901-23456789a004',
    user_id: '8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a',
    item_name: 'Milk',
    default_units: 'cartons', // differs from global "Milk" (gallons)
    is_global: false,
  },

  // Bob (b8b38a32-4513-4c1c-915b-126efba9dbe2) – Meal Prep List
  {
    item_template_id: '222b3c4d-5e6f-4708-9012-3456789ab001',
    user_id: 'b8b38a32-4513-4c1c-915b-126efba9dbe2',
    item_name: 'Brown Rice (bulk)',
    default_units: 'pounds',
    is_global: false,
  },
  {
    item_template_id: '222b3c4d-5e6f-4708-9012-3456789ab002',
    user_id: 'b8b38a32-4513-4c1c-915b-126efba9dbe2',
    item_name: 'Chicken Thighs',
    default_units: 'pounds',
    is_global: false,
  },
  {
    item_template_id: '222b3c4d-5e6f-4708-9012-3456789ab003',
    user_id: 'b8b38a32-4513-4c1c-915b-126efba9dbe2',
    item_name: 'Frozen Mixed Vegetables',
    default_units: 'bags',
    is_global: false,
  },
  {
    item_template_id: '222b3c4d-5e6f-4708-9012-3456789ab004',
    user_id: 'b8b38a32-4513-4c1c-915b-126efba9dbe2',
    item_name: 'Greek Yogurt (tub)',
    default_units: 'containers',
    is_global: false,
  },

  // Carol (c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61) – Party Shopping / Office Supplies
  {
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc001',
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61',
    item_name: 'Party Cups',
    default_units: 'packs',
    is_global: false,
  },
  {
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc002',
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61',
    item_name: 'Party Ice Bags',
    default_units: 'bags',
    is_global: false,
  },
  {
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc003',
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61',
    item_name: 'Assorted Soda (2L)',
    default_units: 'bottles',
    is_global: false,
  },
  {
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc004',
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61',
    item_name: 'Printer Paper (ream)',
    default_units: 'packs',
    is_global: false,
  },
  {
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc005',
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61',
    item_name: 'Sticky Notes',
    default_units: 'pads',
    is_global: false,
  },

  // Dave (a1f1b42b-9c2b-4d74-bc9c-94cbf6ee1f9b) – Home Improvement List
  {
    item_template_id: '444d5e6f-7081-492a-1234-56789abcd001',
    user_id: 'a1f1b42b-9c2b-4d74-bc9c-94cbf6ee1f9b',
    item_name: "Painter's Tape",
    default_units: 'rolls',
    is_global: false,
  },
  {
    item_template_id: '444d5e6f-7081-492a-1234-56789abcd002',
    user_id: 'a1f1b42b-9c2b-4d74-bc9c-94cbf6ee1f9b',
    item_name: 'LED Light Bulbs',
    default_units: 'packs',
    is_global: false,
  },
  {
    item_template_id: '444d5e6f-7081-492a-1234-56789abcd003',
    user_id: 'a1f1b42b-9c2b-4d74-bc9c-94cbf6ee1f9b',
    item_name: 'Extension Cords',
    default_units: 'units',
    is_global: false,
  },
  {
    item_template_id: '444d5e6f-7081-492a-1234-56789abcd004',
    user_id: 'a1f1b42b-9c2b-4d74-bc9c-94cbf6ee1f9b',
    item_name: 'Wall Anchors',
    default_units: 'packs',
    is_global: false,
  },

  // Eve (f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81) – Holiday Gifts / Organic Groceries
  {
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde001',
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81',
    item_name: 'Gift Wrap Rolls',
    default_units: 'rolls',
    is_global: false,
  },
  {
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde002',
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81',
    item_name: 'Ribbon Spools',
    default_units: 'spools',
    is_global: false,
  },
  {
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde003',
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81',
    item_name: 'Organic Coffee Beans',
    default_units: 'bags',
    is_global: false,
  },
  {
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde004',
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81',
    item_name: 'Organic Peanut Butter',
    default_units: 'jars',
    is_global: false,
  },
  {
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde005',
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81',
    item_name: 'Organic Salad Mix',
    default_units: 'bags',
    is_global: false,
  },
];

/////////////////////////////////////////////////////////////
//////////////////// SHOPPING LIST ITEMS ////////////////////
/////////////////////////////////////////////////////////////

export const shoppingListItemsSeed = [
  // Alice – Weekly Groceries
  {
    list_item_id: 'aaa11111-1111-4111-8111-aaaaaaaaaaa1',
    list_id: 'f91a0a1a-d91b-4e83-bb54-ec91e6a9af11',
    item_template_id: '111a2b3c-4d5e-46f7-8901-23456789a001',
    item_name: 'Whole Wheat Bread Rolls',
    default_units: 'packs',
    amount: 2,
    checked_off: false,
    item_notes: 'Get fresh-baked if available.',
  },
  {
    list_item_id: 'aaa11111-1111-4111-8111-aaaaaaaaaaa2',
    list_id: 'f91a0a1a-d91b-4e83-bb54-ec91e6a9af11',
    item_template_id: '111a2b3c-4d5e-46f7-8901-23456789a004',
    item_name: 'Milk',
    default_units: 'cartons',
    amount: 2,
    checked_off: false,
    item_notes: 'Prefer 2% lactose-free.',
  },
  {
    list_item_id: 'aaa11111-1111-4111-8111-aaaaaaaaaaa3',
    list_id: 'f91a0a1a-d91b-4e83-bb54-ec91e6a9af11',
    item_template_id: '00000001-0000-4000-8000-000000000021',
    item_name: 'Eggs',
    default_units: 'dozen',
    amount: 1,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'aaa11111-1111-4111-8111-aaaaaaaaaaa4',
    list_id: 'f91a0a1a-d91b-4e83-bb54-ec91e6a9af11',
    item_template_id: '00000001-0000-4000-8000-000000000047',
    item_name: 'Apples',
    default_units: 'pounds',
    amount: 3,
    checked_off: false,
    item_notes: 'Honeycrisp if in season.',
  },

  // Alice – Camping Supplies
  {
    list_item_id: 'aaa22222-2222-4222-8222-aaaaaaaaaaa1',
    list_id: 'a912e6a4-52b1-45c0-bdb4-79e4a3f4589f',
    item_template_id: '111a2b3c-4d5e-46f7-8901-23456789a002',
    item_name: 'Trail Mix',
    default_units: 'bags',
    amount: 2,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'aaa22222-2222-4222-8222-aaaaaaaaaaa2',
    list_id: 'a912e6a4-52b1-45c0-bdb4-79e4a3f4589f',
    item_template_id: '111a2b3c-4d5e-46f7-8901-23456789a003',
    item_name: 'Marshmallows for S’mores',
    default_units: 'bags',
    amount: 1,
    checked_off: false,
    item_notes: 'Mini-size works better for roasting.',
  },
  {
    list_item_id: 'aaa22222-2222-4222-8222-aaaaaaaaaaa3',
    list_id: 'a912e6a4-52b1-45c0-bdb4-79e4a3f4589f',
    item_template_id: '00000001-0000-4000-8000-000000000001',
    item_name: 'Toilet Paper',
    default_units: 'packages',
    amount: 1,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'aaa22222-2222-4222-8222-aaaaaaaaaaa4',
    list_id: 'a912e6a4-52b1-45c0-bdb4-79e4a3f4589f',
    item_template_id: '00000001-0000-4000-8000-000000000002',
    item_name: 'Paper Towels',
    default_units: 'packages',
    amount: 1,
    checked_off: false,
    item_notes: 'Avoid single-ply brand.',
  },

  // Bob – Meal Prep List
  {
    list_item_id: 'bbb33333-3333-4333-8333-bbbbbbbbbbb1',
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53',
    item_template_id: '222b3c4d-5e6f-4708-9012-3456789ab001',
    item_name: 'Brown Rice (bulk)',
    default_units: 'pounds',
    amount: 5,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'bbb33333-3333-4333-8333-bbbbbbbbbbb2',
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53',
    item_template_id: '222b3c4d-5e6f-4708-9012-3456789ab002',
    item_name: 'Chicken Thighs',
    default_units: 'pounds',
    amount: 4,
    checked_off: false,
    item_notes: 'Boneless, skinless preferred.',
  },
  {
    list_item_id: 'bbb33333-3333-4333-8333-bbbbbbbbbbb3',
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53',
    item_template_id: '222b3c4d-5e6f-4708-9012-3456789ab003',
    item_name: 'Frozen Mixed Vegetables',
    default_units: 'bags',
    amount: 3,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'bbb33333-3333-4333-8333-bbbbbbbbbbb4',
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53',
    item_template_id: '222b3c4d-5e6f-4708-9012-3456789ab004',
    item_name: 'Greek Yogurt (tub)',
    default_units: 'containers',
    amount: 2,
    checked_off: false,
    item_notes: 'Vanilla flavor only.',
  },
  {
    list_item_id: 'bbb33333-3333-4333-8333-bbbbbbbbbbb5',
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53',
    item_template_id: '00000001-0000-4000-8000-000000000037',
    item_name: 'Olive Oil',
    default_units: 'bottles',
    amount: 1,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'bbb33333-3333-4333-8333-bbbbbbbbbbb6',
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53',
    item_template_id: '00000001-0000-4000-8000-000000000034',
    item_name: 'Salt',
    default_units: 'containers',
    amount: 1,
    checked_off: false,
    item_notes: 'Sea salt only.',
  },

  // Carol – Party Shopping
  {
    list_item_id: 'ccc44444-4444-4444-8444-ccccccccccc1',
    list_id: 'c3eeb21e-15a0-43a4-9b6d-7c2f84e5b91f',
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc001',
    item_name: 'Party Cups',
    default_units: 'packs',
    amount: 3,
    checked_off: false,
    item_notes: 'Red or blue only.',
  },
  {
    list_item_id: 'ccc44444-4444-4444-8444-ccccccccccc2',
    list_id: 'c3eeb21e-15a0-43a4-9b6d-7c2f84e5b91f',
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc002',
    item_name: 'Party Ice Bags',
    default_units: 'bags',
    amount: 4,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'ccc44444-4444-4444-8444-ccccccccccc3',
    list_id: 'c3eeb21e-15a0-43a4-9b6d-7c2f84e5b91f',
    item_template_id: '00000001-0000-4000-8000-000000000076',
    item_name: 'Chips',
    default_units: 'bags',
    amount: 5,
    checked_off: false,
    item_notes: 'Mix of salty and sweet flavors.',
  },
  {
    list_item_id: 'ccc44444-4444-4444-8444-ccccccccccc4',
    list_id: 'c3eeb21e-15a0-43a4-9b6d-7c2f84e5b91f',
    item_template_id: '00000001-0000-4000-8000-000000000092',
    item_name: 'Paper Plates',
    default_units: 'packs',
    amount: 2,
    checked_off: false,
    item_notes: null,
  },

  // Carol – Office Supplies
  {
    list_item_id: 'ccc55555-5555-4455-8555-ccccccccccc1',
    list_id: '1a7a7c62-02e2-41a2-9f5e-620eb6df7b02',
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc004',
    item_name: 'Printer Paper (ream)',
    default_units: 'packs',
    amount: 2,
    checked_off: false,
    item_notes: '20 lb weight minimum.',
  },
  {
    list_item_id: 'ccc55555-5555-4455-8555-ccccccccccc2',
    list_id: '1a7a7c62-02e2-41a2-9f5e-620eb6df7b02',
    item_template_id: '333c4d5e-6f70-4819-0123-456789abc005',
    item_name: 'Sticky Notes',
    default_units: 'pads',
    amount: 4,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'ccc55555-5555-4455-8555-ccccccccccc3',
    list_id: '1a7a7c62-02e2-41a2-9f5e-620eb6df7b02',
    item_template_id: '00000001-0000-4000-8000-000000000020',
    item_name: 'Facial Tissue',
    default_units: 'boxes',
    amount: 3,
    checked_off: false,
    item_notes: 'Keep one box per desk.',
  },
  {
    list_item_id: 'ccc55555-5555-4455-8555-ccccccccccc4',
    list_id: '1a7a7c62-02e2-41a2-9f5e-620eb6df7b02',
    item_template_id: '00000001-0000-4000-8000-000000000088',
    item_name: 'Coffee',
    default_units: 'bags',
    amount: 1,
    checked_off: false,
    item_notes: 'Medium roast preferred.',
  },

  // Dave – Home Improvement List
  {
    list_item_id: 'ddd66666-6666-4666-8666-ddddddddddd1',
    list_id: '6a7f021d-d08c-4b71-a7a0-2b7d32ef8ac3',
    item_template_id: '444d5e6f-7081-492a-1234-56789abcd001',
    item_name: "Painter's Tape",
    default_units: 'rolls',
    amount: 3,
    checked_off: false,
    item_notes: 'Blue tape, 2-inch width.',
  },
  {
    list_item_id: 'ddd66666-6666-4666-8666-ddddddddddd2',
    list_id: '6a7f021d-d08c-4b71-a7a0-2b7d32ef8ac3',
    item_template_id: '444d5e6f-7081-492a-1234-56789abcd002',
    item_name: 'LED Light Bulbs',
    default_units: 'packs',
    amount: 2,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'ddd66666-6666-4666-8666-ddddddddddd3',
    list_id: '6a7f021d-d08c-4b71-a7a0-2b7d32ef8ac3',
    item_template_id: '00000001-0000-4000-8000-000000000003',
    item_name: 'Trash Bags',
    default_units: 'boxes',
    amount: 1,
    checked_off: false,
    item_notes: 'Contractor-grade preferred.',
  },
  {
    list_item_id: 'ddd66666-6666-4666-8666-ddddddddddd4',
    list_id: '6a7f021d-d08c-4b71-a7a0-2b7d32ef8ac3',
    item_template_id: '00000001-0000-4000-8000-000000000099',
    item_name: 'Cleaning Spray',
    default_units: 'bottles',
    amount: 1,
    checked_off: false,
    item_notes: null,
  },

  // Eve – Holiday Gifts
  {
    list_item_id: 'eee77777-7777-4777-8777-eeeeeeeeeee1',
    list_id: 'b92b621a-6133-4c93-a5c4-50ebf2b936a7',
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde001',
    item_name: 'Gift Wrap Rolls',
    default_units: 'rolls',
    amount: 4,
    checked_off: false,
    item_notes: 'Metallic patterns only.',
  },
  {
    list_item_id: 'eee77777-7777-4777-8777-eeeeeeeeeee2',
    list_id: 'b92b621a-6133-4c93-a5c4-50ebf2b936a7',
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde002',
    item_name: 'Ribbon Spools',
    default_units: 'spools',
    amount: 3,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'eee77777-7777-4777-8777-eeeeeeeeeee3',
    list_id: 'b92b621a-6133-4c93-a5c4-50ebf2b936a7',
    item_template_id: '00000001-0000-4000-8000-000000000097',
    item_name: 'Zipper Bags',
    default_units: 'boxes',
    amount: 1,
    checked_off: false,
    item_notes: 'For small craft items.',
  },
  {
    list_item_id: 'eee77777-7777-4777-8777-eeeeeeeeeee4',
    list_id: 'b92b621a-6133-4c93-a5c4-50ebf2b936a7',
    item_template_id: '00000001-0000-4000-8000-000000000096',
    item_name: 'Plastic Wrap',
    default_units: 'rolls',
    amount: 1,
    checked_off: false,
    item_notes: null,
  },

  // Eve – Groceries – Organic Only
  {
    list_item_id: 'eee88888-8888-4888-8888-eeeeeeeeeee1',
    list_id: '85ccbd1b-3b9d-4ac7-b1c3-5031d8c65ef9',
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde003',
    item_name: 'Organic Coffee Beans',
    default_units: 'bags',
    amount: 1,
    checked_off: false,
    item_notes: 'Fair trade certified only.',
  },
  {
    list_item_id: 'eee88888-8888-4888-8888-eeeeeeeeeee2',
    list_id: '85ccbd1b-3b9d-4ac7-b1c3-5031d8c65ef9',
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde004',
    item_name: 'Organic Peanut Butter',
    default_units: 'jars',
    amount: 1,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'eee88888-8888-4888-8888-eeeeeeeeeee3',
    list_id: '85ccbd1b-3b9d-4ac7-b1c3-5031d8c65ef9',
    item_template_id: '555e6f70-8192-4a3b-2345-6789abcde005',
    item_name: 'Organic Salad Mix',
    default_units: 'bags',
    amount: 2,
    checked_off: false,
    item_notes: 'Avoid spring mix, go with spinach.',
  },
  {
    list_item_id: 'eee88888-8888-4888-8888-eeeeeeeeeee4',
    list_id: '85ccbd1b-3b9d-4ac7-b1c3-5031d8c65ef9',
    item_template_id: '00000001-0000-4000-8000-000000000069',
    item_name: 'Plant-Based Milk',
    default_units: 'cartons',
    amount: 2,
    checked_off: false,
    item_notes: null,
  },
  {
    list_item_id: 'eee88888-8888-4888-8888-eeeeeeeeeee5',
    list_id: '85ccbd1b-3b9d-4ac7-b1c3-5031d8c65ef9',
    item_template_id: '00000001-0000-4000-8000-000000000085',
    item_name: 'Frozen Fruit',
    default_units: 'bags',
    amount: 2,
    checked_off: false,
    item_notes: 'Mixed berry blend preferred.',
  },
];

/////////////////////////////////////////////////////////////
//////////////////// SHOPPING LIST USERS ////////////////////
/////////////////////////////////////////////////////////////

export const shoppingListUsersSeed = [
  // Alice – Weekly Groceries (owner) + Bob (editor)
  {
    user_id: '8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a', // Alice
    list_id: 'f91a0a1a-d91b-4e83-bb54-ec91e6a9af11', // Weekly Groceries
    user_role: 'owner',
    is_pinned: true,
  },
  {
    user_id: 'b8b38a32-4513-4c1c-915b-126efba9dbe2', // Bob
    list_id: 'f91a0a1a-d91b-4e83-bb54-ec91e6a9af11',
    user_role: 'editor',
    is_pinned: false,
  },

  // Alice – Camping Supplies (owner only)
  {
    user_id: '8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a', // Alice
    list_id: 'a912e6a4-52b1-45c0-bdb4-79e4a3f4589f', // Camping Supplies
    user_role: 'owner',
    is_pinned: false,
  },

  // Bob – Meal Prep List (owner) + Carol (editor)
  {
    user_id: 'b8b38a32-4513-4c1c-915b-126efba9dbe2', // Bob
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53', // Meal Prep List
    user_role: 'owner',
    is_pinned: true,
  },
  {
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61', // Carol
    list_id: '63f087f9-857a-42d2-8bc4-2a168b9d4c53',
    user_role: 'editor',
    is_pinned: false,
  },

  // Carol – Party Shopping (owner) + Eve (editor)
  {
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61', // Carol
    list_id: 'c3eeb21e-15a0-43a4-9b6d-7c2f84e5b91f', // Party Shopping
    user_role: 'owner',
    is_pinned: true,
  },
  {
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81', // Eve
    list_id: 'c3eeb21e-15a0-43a4-9b6d-7c2f84e5b91f',
    user_role: 'editor',
    is_pinned: false,
  },

  // Carol – Office Supplies (owner only)
  {
    user_id: 'c5c087f0-31d1-4b4f-b6e1-5c0dc7c71f61', // Carol
    list_id: '1a7a7c62-02e2-41a2-9f5e-620eb6df7b02', // Office Supplies
    user_role: 'owner',
    is_pinned: false,
  },

  // Dave – Home Improvement List (owner) + Alice (editor)
  {
    user_id: 'a1f1b42b-9c2b-4d74-bc9c-94cbf6ee1f9b', // Dave
    list_id: '6a7f021d-d08c-4b71-a7a0-2b7d32ef8ac3', // Home Improvement List
    user_role: 'owner',
    is_pinned: true,
  },
  {
    user_id: '8c9c0f4a-7c0b-4f60-b86d-26c23cfe9b1a', // Alice
    list_id: '6a7f021d-d08c-4b71-a7a0-2b7d32ef8ac3',
    user_role: 'editor',
    is_pinned: false,
  },

  // Eve – Holiday Gifts (owner only)
  {
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81', // Eve
    list_id: 'b92b621a-6133-4c93-a5c4-50ebf2b936a7', // Holiday Gifts
    user_role: 'owner',
    is_pinned: true,
  },

  // Eve – Groceries – Organic Only (owner) + Bob (editor)
  {
    user_id: 'f3f8cc2b-2d54-474e-8cb0-b0b0e43c4f81', // Eve
    list_id: '85ccbd1b-3b9d-4ac7-b1c3-5031d8c65ef9', // Groceries – Organic Only
    user_role: 'owner',
    is_pinned: false,
  },
  {
    user_id: 'b8b38a32-4513-4c1c-915b-126efba9dbe2', // Bob
    list_id: '85ccbd1b-3b9d-4ac7-b1c3-5031d8c65ef9',
    user_role: 'editor',
    is_pinned: false,
  },
];