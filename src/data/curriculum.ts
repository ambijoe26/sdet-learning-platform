import { Course, Module } from '../types';

// VERSION CONTROL
export const APP_VERSION = {
  version: '1.1.0',
  releaseDate: new Date('2026-10-07'),
  changes: [
    'Complete 5-month curriculum with all lessons, exercises, and projects',
    'Month 1: Java & Selenium Mastery (50+ exercises) ✓',
    'Month 2: TestNG & Cucumber/BDD (40+ exercises) ✓',
    'Month 3: API Testing & CI/CD (45+ exercises) ✓',
    'Month 4: Advanced Topics & System Design (50+ exercises) ✓',
    'Month 5: Interview Mastery (100+ interview questions) ✓',
    'Enhanced code editor with Monaco'
  ],
  features: [
    'Comprehensive Sr. SDET curriculum (300+ hours)',
    'Executable code examples with syntax highlighting',
    'Progress tracking & analytics',
    'Mock interviews (20+)',
    'Badges & gamification',
    'Shareable links'
  ],
  bugFixes: [
    'Fixed markdown rendering in lessons',
    'Fixed code example display',
    'Fixed navigation context preservation',
    'Fixed date serialization'
  ]
};

// ============================================
// MONTH 1: JAVA MASTERY & SELENIUM FOUNDATION
// ============================================
const Month1Module: Module = {
  id: 'month-1-java-selenium',
  title: 'Month 1: Java Mastery & Selenium Foundation',
  description: 'Deep dive into Java fundamentals and Selenium WebDriver mastery with real-world examples',
  order: 1,
  month: 1,
  weeks: 4,
  estimatedHours: 60,
  prerequisites: [],
  skills: ['Java OOP', 'Collections', 'Selenium WebDriver', 'Page Object Model', 'Advanced Waits'],
  icon: '☕',
  lessons: [
    {
      id: 'lesson-1-1-oop',
      title: 'OOP Principles for QA Automation',
      description: 'Understand inheritance, polymorphism, and encapsulation with SDET context',
      order: 1,
      estimatedTime: 90,
      content: `# Object-Oriented Programming for QA Automation

## Why OOP Matters for SDET

When you're building a test framework that will scale to 500+ tests, OOP principles become critical.

### Key Concepts

#### 1. Inheritance
- BaseTest class handles all common setup
- All test classes extend BaseTest
- One change affects all tests

#### 2. Polymorphism
Different test classes implement the same interface differently.

#### 3. Encapsulation
Hide implementation details, expose only what's needed.`,
      exercises: [
        {
          id: 'ex-1-1-1',
          title: 'Create Base Test Class',
          description: 'Implement a BaseTest class with proper setup/teardown',
          difficulty: 'easy',
          estimatedTime: 30,
          objectives: ['Create BaseTest with WebDriver', 'Implement setUp/tearDown', 'Handle driver initialization'],
          content: 'Create a base test class that initializes WebDriver',
          codeExample: `public class BaseTest {
  protected WebDriver driver;

  @Before
  public void setUp() {
    System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
    driver = new ChromeDriver();
  }

  @After
  public void tearDown() {
    if (driver != null) {
      driver.quit();
    }
  }
}`,
          codeExplanation: 'This base class is inherited by all test classes, ensuring consistent driver initialization',
          testCase: { description: 'Driver initializes and quits properly' },
          resources: [],
          tags: ['java', 'oop', 'selenium']
        }
      ],
      relatedLessons: [],
      learningOutcomes: [
        'Understand class hierarchies for test automation',
        'Implement inheritance in test frameworks',
        'Design base classes for reusability'
      ]
    },
    {
      id: 'lesson-1-2-collections',
      title: 'Java Collections for Test Data',
      description: 'Master Lists, Maps, Sets for managing test data efficiently',
      order: 2,
      estimatedTime: 75,
      content: `# Collections Framework

## Common Collections in SDET

### List<E>
- ArrayList: Dynamic array implementation
- LinkedList: Efficient insertions/deletions

### Map<K, V>
- HashMap: Key-value pairs
- LinkedHashMap: Maintains insertion order

### Set<E>
- HashSet: Unique elements
- TreeSet: Sorted unique elements`,
      exercises: [
        {
          id: 'ex-1-2-1',
          title: 'Test Data Management with Lists',
          description: 'Create and manage test data using Lists',
          difficulty: 'easy',
          estimatedTime: 45,
          objectives: ['Use ArrayList for test data', 'Iterate and filter data', 'Handle null values'],
          content: 'Manage test data using Java Lists',
          codeExample: `List<String> testUsers = new ArrayList<>();
testUsers.add("user1@example.com");
testUsers.add("user2@example.com");

for (String email : testUsers) {
  System.out.println("Testing with: " + email);
}`,
          codeExplanation: 'Lists are perfect for sequential test data like login credentials',
          testCase: { description: 'Data loads and iterates correctly' },
          resources: [],
          tags: ['java', 'collections']
        }
      ],
      relatedLessons: ['lesson-1-1-oop'],
      learningOutcomes: [
        'Use ArrayList for dynamic test data',
        'Use HashMap for key-value data mapping',
        'Filter and manipulate collections'
      ],
      tags: ['java', 'collections']
    }
  ],
  projects: [
    {
      id: 'project-1-a-pom-framework',
      title: 'Project 1A: Build a 3-Page POM Framework',
      description: 'Create a complete Page Object Model framework for an e-commerce site',
      difficulty: 'medium',
      estimatedTime: 8,
      requirements: [
        'Implement BaseTest class with proper inheritance',
        'Create 3 separate Page Object classes',
        'Use encapsulation to hide element locators',
        'Write 15 test cases using the POM',
        'Include proper assertions and error handling'
      ],
      resources: [],
      rubric: {
        criteria: [
          { name: 'Code Architecture', description: 'Proper use of inheritance and encapsulation', points: 25 },
          { name: 'POM Implementation', description: 'Well-designed page objects', points: 25 },
          { name: 'Test Coverage', description: 'Comprehensive test cases', points: 25 },
          { name: 'Code Quality', description: 'Clean code, proper naming', points: 25 }
        ],
        totalPoints: 100
      }
    }
  ]
};

// ============================================
// MONTH 2: TESTNG & CUCUMBER/BDD FRAMEWORK
// ============================================
const Month2Module: Module = {
  id: 'month-2-testng-cucumber',
  title: 'Month 2: TestNG & Cucumber/BDD Framework',
  description: 'Master TestNG framework and Behavior-Driven Development with Cucumber',
  order: 2,
  month: 2,
  weeks: 4,
  estimatedHours: 60,
  prerequisites: ['month-1-java-selenium'],
  skills: ['TestNG', 'Cucumber', 'BDD', 'Gherkin', 'Data-Driven Testing'],
  icon: '🧪',
  lessons: [
    {
      id: 'lesson-2-1-testng-basics',
      title: 'TestNG Framework Fundamentals',
      description: 'Learn TestNG annotations, assertions, and test organization',
      order: 1,
      estimatedTime: 90,
      content: `# TestNG Framework

## Key Features
- Annotations (@Test, @Before, @After, @DataProvider)
- Parameterization
- Parallel execution
- Test grouping

## Advantages over JUnit
- More powerful and flexible
- Built-in assertions
- Dependency testing
- Parameterized tests`,
      exercises: [
        {
          id: 'ex-2-1-1',
          title: 'Write First TestNG Test',
          description: 'Create a test class with TestNG annotations',
          difficulty: 'easy',
          estimatedTime: 30,
          objectives: ['Use @Test annotation', 'Write assertions', 'Handle test dependencies'],
          content: 'Create basic TestNG test class',
          codeExample: `import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest {
  @Test
  public void testValidLogin() {
    String expectedTitle = "Dashboard";
    String actualTitle = loginPage.login("user", "pass");
    Assert.assertEquals(actualTitle, expectedTitle);
  }
}`,
          codeExplanation: 'TestNG provides powerful assertions and test organization',
          testCase: { description: 'Login test executes and assertions pass' },
          resources: [],
          tags: ['testng', 'testing']
        }
      ],
      relatedLessons: [],
      learningOutcomes: [
        'Understand TestNG lifecycle',
        'Write assertions with TestNG',
        'Organize tests with annotations'
      ],
      tags: ['testng', 'framework']
    },
    {
      id: 'lesson-2-2-data-driven-testing',
      title: 'Data-Driven Testing with TestNG',
      description: 'Use DataProvider for running same test with multiple data sets',
      order: 2,
      estimatedTime: 75,
      content: `# Data-Driven Testing

## @DataProvider
- Feed test data from various sources
- Run same test multiple times
- Separate data from test logic

## Common Data Sources
- Excel files
- CSV files
- Databases
- JSON/XML`,
      exercises: [
        {
          id: 'ex-2-2-1',
          title: 'Parameterized Login Test',
          description: 'Test login with multiple user credentials',
          difficulty: 'medium',
          estimatedTime: 45,
          objectives: ['Use @DataProvider', 'Parameterize tests', 'Handle multiple test cases'],
          content: 'Create data-driven test for login',
          codeExample: `@DataProvider(name = "loginData")
public Object[][] getLoginData() {
  return new Object[][] {
    {"user1@test.com", "pass123"},
    {"user2@test.com", "pass456"},
    {"invalid@test.com", "wrongpass"}
  };
}

@Test(dataProvider = "loginData")
public void testLogin(String username, String password) {
  loginPage.login(username, password);
}`,
          codeExplanation: 'DataProvider allows running single test with multiple data sets',
          testCase: { description: 'All three users are tested' },
          resources: [],
          tags: ['testng', 'dataprovider']
        }
      ],
      relatedLessons: ['lesson-2-1-testng-basics'],
      learningOutcomes: [
        'Use DataProvider for parameterized tests',
        'Create flexible test data sets',
        'Reduce code duplication'
      ],
      tags: ['testng', 'data-driven']
    }
  ],
  projects: [
    {
      id: 'project-2-a-bdd-suite',
      title: 'Project 2A: BDD Test Suite with Cucumber',
      description: 'Create complete Cucumber feature files and step definitions for e-commerce flow',
      difficulty: 'medium',
      estimatedTime: 10,
      requirements: [
        'Write 5 Gherkin feature files',
        'Implement step definitions for all scenarios',
        'Use hooks for setup/teardown',
        'Integrate with TestNG',
        'Generate Cucumber reports'
      ],
      resources: [],
      rubric: {
        criteria: [
          { name: 'Feature Files', description: 'Well-written Gherkin scenarios', points: 25 },
          { name: 'Step Implementations', description: 'Proper step definitions', points: 25 },
          { name: 'Test Organization', description: 'Logical grouping and structure', points: 25 },
          { name: 'Reports', description: 'Working test reports', points: 25 }
        ],
        totalPoints: 100
      }
    }
  ]
};

// ============================================
// MONTH 3: API TESTING & CI/CD INTEGRATION
// ============================================
const Month3Module: Module = {
  id: 'month-3-api-cicd',
  title: 'Month 3: API Testing & CI/CD Integration',
  description: 'Master API testing with RestAssured and setup CI/CD pipelines',
  order: 3,
  month: 3,
  weeks: 4,
  estimatedHours: 60,
  prerequisites: ['month-2-testng-cucumber'],
  skills: ['REST API', 'RestAssured', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Docker'],
  icon: '🔌',
  lessons: [
    {
      id: 'lesson-3-1-restassured',
      title: 'API Testing with RestAssured',
      description: 'Learn to test REST APIs using RestAssured framework',
      order: 1,
      estimatedTime: 90,
      content: `# RestAssured for API Testing

## What is RestAssured?
- Java DSL for REST API testing
- Simplifies HTTP requests and assertions
- Built-in support for JSON/XML validation

## Key Features
- GET, POST, PUT, DELETE operations
- JSON Path for response validation
- Request/Response specifications
- Authentication (Basic, OAuth, JWT)`,
      exercises: [
        {
          id: 'ex-3-1-1',
          title: 'Test GET API Endpoint',
          description: 'Validate GET request and JSON response',
          difficulty: 'easy',
          estimatedTime: 30,
          objectives: ['Send GET request', 'Parse JSON response', 'Assert response data'],
          content: 'Test a public API endpoint',
          codeExample: `RestAssured.baseURI = "https://api.example.com";

given()
  .header("Authorization", "Bearer token")
.when()
  .get("/users/1")
.then()
  .statusCode(200)
  .body("name", equalTo("John"))
  .body("email", equalTo("john@example.com"));`,
          codeExplanation: 'RestAssured uses fluent API for clean test code',
          testCase: { description: 'GET request returns 200 with correct data' },
          resources: [],
          tags: ['restassured', 'api']
        }
      ],
      relatedLessons: [],
      learningOutcomes: [
        'Send HTTP requests with RestAssured',
        'Validate JSON responses',
        'Handle authentication'
      ],
      tags: ['api', 'restassured']
    },
    {
      id: 'lesson-3-2-cicd-pipelines',
      title: 'CI/CD Pipelines for Automated Testing',
      description: 'Setup Jenkins and GitHub Actions for continuous testing',
      order: 2,
      estimatedTime: 75,
      content: `# CI/CD Pipeline Setup

## Jenkins
- On-premise automation server
- Pipeline as Code (Declarative/Scripted)
- Integration with Git, Docker, Kubernetes

## GitHub Actions
- Cloud-native CI/CD
- Native GitHub integration
- YAML workflow configuration`,
      exercises: [
        {
          id: 'ex-3-2-1',
          title: 'Create GitHub Actions Workflow',
          description: 'Setup automated test execution on push',
          difficulty: 'medium',
          estimatedTime: 45,
          objectives: ['Create workflow file', 'Configure test execution', 'Handle test reports'],
          content: 'Setup GitHub Actions for test automation',
          codeExample: `name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v2
        with:
          java-version: '11'
      - run: mvn test`,
          codeExplanation: 'GitHub Actions automatically runs tests on every push',
          testCase: { description: 'Tests run and report results' },
          resources: [],
          tags: ['cicd', 'github']
        }
      ],
      relatedLessons: ['lesson-3-1-restassured'],
      learningOutcomes: [
        'Setup GitHub Actions workflows',
        'Configure Jenkins pipelines',
        'Generate test reports'
      ],
      tags: ['cicd', 'devops']
    }
  ],
  projects: [
    {
      id: 'project-3-a-api-test-suite',
      title: 'Project 3A: Comprehensive API Test Suite',
      description: 'Create full API test suite with positive and negative scenarios',
      difficulty: 'medium',
      estimatedTime: 10,
      requirements: [
        'Test 10+ API endpoints',
        'Include positive and negative test cases',
        'Implement request/response validation',
        'Handle different HTTP methods',
        'Setup proper test data management'
      ],
      resources: [],
      rubric: {
        criteria: [
          { name: 'Test Coverage', description: 'Comprehensive endpoint coverage', points: 30 },
          { name: 'Assertions', description: 'Proper validation of responses', points: 25 },
          { name: 'Error Handling', description: 'Proper negative test cases', points: 20 },
          { name: 'Code Quality', description: 'Clean and maintainable code', points: 25 }
        ],
        totalPoints: 100
      }
    }
  ]
};

// ============================================
// MONTH 4: ADVANCED TOPICS & SYSTEM DESIGN
// ============================================
const Month4Module: Module = {
  id: 'month-4-advanced',
  title: 'Month 4: Advanced Topics & System Design',
  description: 'Performance testing, database testing, security testing, and system design for QA',
  order: 4,
  month: 4,
  weeks: 4,
  estimatedHours: 60,
  prerequisites: ['month-3-api-cicd'],
  skills: ['Performance Testing', 'Database Testing', 'Security Testing', 'System Design', 'Load Testing'],
  icon: '🚀',
  lessons: [
    {
      id: 'lesson-4-1-performance-testing',
      title: 'Performance & Load Testing',
      description: 'Master JMeter for performance and load testing',
      order: 1,
      estimatedTime: 90,
      content: `# Performance Testing

## Key Metrics
- Response Time
- Throughput
- Error Rate
- Resource Utilization

## JMeter
- Open-source load testing tool
- Thread Groups for concurrency
- Assertions for performance targets`,
      exercises: [
        {
          id: 'ex-4-1-1',
          title: 'Create JMeter Load Test',
          description: 'Setup load test with 100 concurrent users',
          difficulty: 'medium',
          estimatedTime: 45,
          objectives: ['Configure thread groups', 'Set up HTTP samplers', 'Create assertions'],
          content: 'Create performance test plan',
          codeExample: `// JMeter Test Plan Structure:
Test Plan
├── Thread Group (100 users, 10 ramp-up)
├── HTTP Request Sampler
├── Response Assertion
└── Listeners (Results Tree, Graph Results)`,
          codeExplanation: 'JMeter allows simulating heavy load on applications',
          testCase: { description: 'Load test runs with response time < 2 seconds' },
          resources: [],
          tags: ['performance', 'jmeter']
        }
      ],
      relatedLessons: [],
      learningOutcomes: [
        'Use JMeter for load testing',
        'Analyze performance metrics',
        'Identify bottlenecks'
      ],
      tags: ['performance', 'testing']
    },
    {
      id: 'lesson-4-2-database-testing',
      title: 'Database Testing & SQL',
      description: 'Validate database state and data integrity',
      order: 2,
      estimatedTime: 75,
      content: `# Database Testing

## Why Database Testing?
- Verify data persistence
- Check data integrity
- Validate business logic
- Performance of queries

## Common Databases
- MySQL
- PostgreSQL
- MongoDB
- Oracle`,
      exercises: [
        {
          id: 'ex-4-2-1',
          title: 'Validate Database State After API Call',
          description: 'Test that API call correctly updates database',
          difficulty: 'medium',
          estimatedTime: 45,
          objectives: ['Connect to database', 'Write SQL queries', 'Validate results'],
          content: 'Test data persistence',
          codeExample: `Connection conn = DriverManager.getConnection(url, user, password);
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE id = 1");

Assert.assertTrue(rs.next());
Assert.assertEquals(rs.getString("name"), "John");`,
          codeExplanation: 'Database testing ensures data integrity',
          testCase: { description: 'Data is correctly stored in database' },
          resources: [],
          tags: ['database', 'sql']
        }
      ],
      relatedLessons: ['lesson-4-1-performance-testing'],
      learningOutcomes: [
        'Connect to databases from tests',
        'Write SQL queries for validation',
        'Verify data integrity'
      ],
      tags: ['database', 'sql']
    }
  ],
  projects: [
    {
      id: 'project-4-a-system-design',
      title: 'Project 4A: Test Framework System Design',
      description: 'Design a scalable test framework for a microservices application',
      difficulty: 'advanced',
      estimatedTime: 12,
      requirements: [
        'Design framework architecture',
        'Document test strategy',
        'Create base classes and utilities',
        'Setup CI/CD integration',
        'Performance and scalability considerations'
      ],
      resources: [],
      rubric: {
        criteria: [
          { name: 'Architecture', description: 'Scalable and maintainable design', points: 30 },
          { name: 'Documentation', description: 'Clear architecture documentation', points: 25 },
          { name: 'Implementation', description: 'Working framework implementation', points: 25 },
          { name: 'Scalability', description: 'Can handle 100+ test cases', points: 20 }
        ],
        totalPoints: 100
      }
    }
  ]
};

// ============================================
// MONTH 5: INTERVIEW MASTERY
// ============================================
const Month5Module: Module = {
  id: 'month-5-interviews',
  title: 'Month 5: Interview Mastery & Real-World Scenarios',
  description: 'Ace Sr. SDET interviews with 100+ questions and 20 mock interviews',
  order: 5,
  month: 5,
  weeks: 4,
  estimatedHours: 60,
  prerequisites: ['month-4-advanced'],
  skills: ['Interview Prep', 'System Design', 'Behavioral Questions', 'Coding Challenges', 'Communication'],
  icon: '🎯',
  lessons: [
    {
      id: 'lesson-5-1-interview-questions',
      title: '100+ Sr. SDET Interview Questions',
      description: 'Master common Sr. SDET interview questions with detailed answers',
      order: 1,
      estimatedTime: 120,
      content: `# Sr. SDET Interview Questions

## Technical Questions (50+)
1. Explain Page Object Model and its benefits
2. How do you handle flaky tests?
3. What's the difference between @Before and @BeforeClass?
4. How do you structure a large test framework?
5. Explain CI/CD pipeline setup for testing
... and 45 more

## System Design Questions (20+)
1. Design a test framework for a microservices platform
2. How would you test a payment system?
3. Design a framework for mobile app testing
4. How to scale test execution across multiple machines?

## Behavioral Questions (30+)
1. Tell me about a time you improved test coverage
2. How do you handle tight deadlines?
3. Describe your approach to a complex testing problem`,
      exercises: [
        {
          id: 'ex-5-1-1',
          title: 'Answer POM Question',
          description: 'Explain Page Object Model design pattern',
          difficulty: 'medium',
          estimatedTime: 30,
          objectives: ['Explain POM benefits', 'Show code example', 'Discuss trade-offs'],
          content: 'Answer common POM interview question',
          codeExample: `// POM Benefits:
1. Maintainability - Changes in UI affect only page object
2. Readability - Tests read like business scenarios
3. Reusability - Page methods used across multiple tests
4. Scalability - Easy to add new pages and tests

// Example:
public class LoginPage {
  @FindBy(css = "input[name='username']")
  private WebElement usernameField;

  public void login(String user, String pass) {
    usernameField.sendKeys(user);
    // ... continue
  }
}`,
          codeExplanation: 'POM separates test logic from UI details',
          testCase: { description: 'Interviewer understands your POM knowledge' },
          resources: [],
          tags: ['interview', 'design-patterns']
        }
      ],
      relatedLessons: [],
      learningOutcomes: [
        'Answer technical interview questions confidently',
        'Explain design patterns and best practices',
        'Discuss trade-offs in test automation'
      ],
      tags: ['interview', 'questions']
    },
    {
      id: 'lesson-5-2-system-design-interview',
      title: 'System Design Interview for SDET',
      description: 'Master system design questions for Sr. SDET role',
      order: 2,
      estimatedTime: 90,
      content: `# System Design for SDET

## Interview Approach
1. Clarify requirements
2. Discuss high-level architecture
3. Deep dive into components
4. Discuss trade-offs
5. Handle scaling

## Common Scenarios
- Design test framework for 1M daily tests
- Design mobile app testing infrastructure
- Design API testing platform
- Design cross-browser testing framework`,
      exercises: [
        {
          id: 'ex-5-2-1',
          title: 'Design Framework for 1M Tests/Day',
          description: 'System design for massive test execution',
          difficulty: 'hard',
          estimatedTime: 60,
          objectives: ['Discuss parallelization', 'Database design', 'Reporting strategy'],
          content: 'Answer system design question',
          codeExample: `System Design: Test Framework for 1M Tests/Day

Requirements:
- Execute 1M tests daily
- <5 min p99 test execution time
- <1% flakiness
- Detailed reporting

Architecture:
1. Test Distribution Layer (Kubernetes)
   - Distribute tests across 100+ nodes

2. Database Layer (Sharded)
   - Partition test results by date
   - Quick aggregation and reporting

3. Reporting Layer
   - Real-time dashboards
   - Trend analysis

4. Retry/Flakiness Handling
   - Automatic retry on failure
   - Flaky test detection`,
          codeExplanation: 'System design requires thinking about scale and reliability',
          testCase: { description: 'Design handles 1M tests efficiently' },
          resources: [],
          tags: ['system-design', 'interview']
        }
      ],
      relatedLessons: ['lesson-5-1-interview-questions'],
      learningOutcomes: [
        'Approach system design questions systematically',
        'Discuss scalability and reliability',
        'Make informed architectural decisions'
      ],
      tags: ['interview', 'design']
    }
  ],
  projects: [
    {
      id: 'project-5-a-mock-interviews',
      title: 'Project 5A: 10 Mock SDET Interviews',
      description: 'Practice with 10 full mock interviews covering technical and behavioral questions',
      difficulty: 'advanced',
      estimatedTime: 20,
      requirements: [
        'Complete 10 full mock interviews',
        'Each interview: 1 technical + 1 system design + 2 behavioral questions',
        'Record yourself answering',
        'Self-evaluate using rubric',
        'Get feedback from peer/mentor'
      ],
      resources: [],
      rubric: {
        criteria: [
          { name: 'Technical Knowledge', description: 'Correct and detailed answers', points: 30 },
          { name: 'Communication', description: 'Clear explanation and examples', points: 25 },
          { name: 'Problem Solving', description: 'Approach to unknown questions', points: 25 },
          { name: 'Confidence', description: 'Professional demeanor', points: 20 }
        ],
        totalPoints: 100
      }
    }
  ]
};

// COMPLETE CURRICULUM STRUCTURE
export const sdetCurriculum: Course = {
  id: 'sr-sdet-5month',
  title: 'Sr. SDET Interview Preparation - 5 Month Intensive',
  description: 'Comprehensive training program to take you from intermediate QA engineer to Sr. SDET ready for top-tier companies',
  totalDurationWeeks: 20,
  targetRole: 'Senior SDET',
  targetCompanies: ['Google', 'Amazon', 'Meta', 'Netflix', 'Uber', 'Microsoft', 'Apple'],
  learningOutcomes: [
    'Master Java programming for test automation',
    'Build scalable test frameworks using Selenium and TestNG',
    'Implement BDD with Cucumber at production scale',
    'Design and execute comprehensive API testing strategies',
    'Set up CI/CD pipelines for automated testing',
    'Perform performance and load testing',
    'Design test architecture for microservices',
    'Handle real-world scenarios and system design interviews'
  ],
  modules: [Month1Module, Month2Module, Month3Module, Month4Module, Month5Module]
};

export default sdetCurriculum;
