var rules={
  "data": [
    {
      "id": 1,
      "identifier": "INF_LE_001",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Subscriber received a new infringement notification for the first time",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": [
        "All Users"
      ]
    },
    {
      "id": 2,
      "identifier": "INF_LE_002",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 1 subscriber received a new infringement notification after eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 3,
      "identifier": "INF_LE_003",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 2 subscriber received a new infringement notification after eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 4,
      "identifier": "INF_LE_004",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 3 subscriber received a new infringement notification after eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 5,
      "identifier": "INF_LE_005",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 4 subscriber received a new infringement notification after eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 6,
      "identifier": "INF_LE_006",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 5 subscriber received a new infringement notification after eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 7,
      "identifier": "INF_LE_007",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 6 subscriber received a new infringement notification after eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 8,
      "identifier": "INF_LE_008",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 7 subscriber received a new infringement notification after eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 9,
      "identifier": "INF_LE_009",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 1 subscriber received a new infringement notification during eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 10,
      "identifier": "INF_LE_010",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 2 subscriber received a new infringement notification during eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    },
    {
      "id": 11,
      "identifier": "INF_LE_011",
      "group": "Infringements",
      "subgroup": "Level Escalation",
      "name": "Level 3 subscriber received a new infringement notification during eligible calendar days",
      "description": "All subscribers begin at Level 0, with no action required by ISP. Upon receiving the first complaint notification, this rule will move subscriber to Level 1 and an email notification should be sent with a notice of the Complaint Notification received pertaining to the account's alleged infringing activity",
      "area": "General Council",
      "conditions": [
        {
          "condition": "days",
          "condition_value": "7"
        }
      ],
      "actions": [
        "Send Email"
      ],
      "targets": "All Users"
    }
  ]
}