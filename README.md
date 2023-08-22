# Portfolio Site
## CURRENTLY A WORK IN PROGRESS
http://ryanearlsoftwareengineer.com/

## Tech Stack

### Languages
This site uses... 
  - JavaScript
  - CSS
  - HTML 

All of the AWS components are coded in... 
  - JavaScript
  - JSON
  - YML
  - bash scripts. 

### AWS
All of the web hosting, domain registration, and back-end functionality exists in AWS.

### CloudFormation
All of the code in this repository is in a CloudFormation template. The buildspec and yaml files in this repository are used to build all of the resources in AWS via CloudFormation. This site is fairly simple and exists to access other projects that live in AWS, so the build is fairly simple. For a more complex build, look to one of my api repositories. 

### Serverless
The deployment of this code to AWS is mainly handled by CloudFormation, but Serverless is utilized to allow for quick deployment for test code and any changes. This allows the developer to continue to make changes on their system and not litter their repo with test pushes. The other benefit is that deploying a single function for test is much faster than rebuilding the entire project. 
