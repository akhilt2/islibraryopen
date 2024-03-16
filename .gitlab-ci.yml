docker-build:
  # Use the official docker image.
  image: docker:cli
  stage: build
  services:
    - docker:dind
  variables:
    DOCKER_IMAGE_NAME: $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG
  before_script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
  # Build and push the Docker image only if a tag is pushed
  script:
    - docker build --pull -t "$DOCKER_IMAGE_NAME" .
    - docker push "$DOCKER_IMAGE_NAME"
    - |
      if [[ -n "$CI_COMMIT_TAG" ]]; then
        docker tag "$DOCKER_IMAGE_NAME" "$CI_REGISTRY_IMAGE:$CI_COMMIT_TAG"
        docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_TAG"
      fi
  # Run this job only if a tag is present
  rules:
    - if: $CI_COMMIT_TAG
