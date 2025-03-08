CLUSTER := a50passos
REGISTRY := k3d-$(CLUSTER)-registry
NAMESPACE := a50passos

.PHONY: dev clean mongo-shell

dev:
	-@k3d cluster create $(CLUSTER) -p "8080:80@loadbalancer" --registry-create $(REGISTRY):10000 --wait
	-@docker run -d --name mongodb -p 27017:27017 mongo
	@kubectl create namespace $(NAMESPACE) 2>/dev/null || true
	-@kubectl create secret generic $(NAMESPACE)-secrets -n $(NAMESPACE) \
		--from-literal=DATABASE=mongodb://host.docker.internal:27017/a50passos \
		--from-literal=SESSION_SECRET=SECRET
	@docker build --pull --no-cache -t $(REGISTRY):10000/fraguinha/a50passos.com:latest src/website
	@docker push $(REGISTRY):10000/fraguinha/a50passos.com:latest
	@helm upgrade --install $(CLUSTER) ./chart -n $(NAMESPACE) -f chart/values-local.yaml
	@kubectl rollout status deployment/a50passos -n $(NAMESPACE)
	@echo "Application available at http://localhost:8080"

clean:
	-@k3d cluster delete $(CLUSTER)
	-@docker stop mongodb && docker rm mongodb

mongo-shell:
	@docker exec -it mongodb mongosh
