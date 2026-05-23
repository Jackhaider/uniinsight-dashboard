# Features: [Attendance %, Mid-term Marks, Assignment Completion %, Class Participation Score 1-10]
# Labels: 'Safe', 'Warning', 'Critical'

TRAINING_DATA = [
    # Safe category (High engagement)
    {'features': [95, 88, 100, 9], 'label': 'Safe'},
    {'features': [90, 85, 95, 8], 'label': 'Safe'},
    {'features': [88, 80, 90, 8], 'label': 'Safe'},
    {'features': [98, 92, 100, 10], 'label': 'Safe'},
    {'features': [85, 75, 85, 7], 'label': 'Safe'},

    # Warning category (Medium engagement / dropping)
    {'features': [75, 65, 80, 6], 'label': 'Warning'},
    {'features': [70, 60, 75, 5], 'label': 'Warning'},
    {'features': [68, 58, 70, 5], 'label': 'Warning'},
    {'features': [80, 55, 65, 4], 'label': 'Warning'},
    {'features': [65, 62, 70, 6], 'label': 'Warning'},

    # Critical category (Low engagement / high risk)
    {'features': [55, 45, 50, 3], 'label': 'Critical'},
    {'features': [50, 40, 40, 2], 'label': 'Critical'},
    {'features': [45, 35, 30, 2], 'label': 'Critical'},
    {'features': [60, 30, 45, 3], 'label': 'Critical'},
    {'features': [40, 38, 35, 1], 'label': 'Critical'},
    {'features': [58, 42, 48, 4], 'label': 'Critical'},
]

def get_training_data():
    return TRAINING_DATA

if __name__ == "__main__":
    print(f"Dataset loaded with {len(TRAINING_DATA)} sample records.")
