run:
	docker run -d -p 4444:3000 -e PORT=4444--rm --name nestapp nest:prisma
stop: 
	docker stop nestapp
