var repoTemplate = (
	`
	<div class="col-sm-6">
		<div class='panel panel-info'>
			<div class='panel-heading'>
				<h3 class='panel-title' id="repo-name"></h3>
			</div>
			<div class='panel-body'>
				<p id="repo-desc"></p>
			</div>
		</div>
	</div>
	`
);

function templateGen(key, index, template){
	var temp = $(template) 
	temp.find("#repo-name").text(key.name);
	temp.find("#repo-desc").text(key.description)
	return temp
}

function renderItem(data, repoTemplate){
	var repos = data.map(function(key, index){
		return templateGen(key, index, repoTemplate)
	})
	$("#repo-list").html(repos)	
}

function renderProfile(data){
	$("#git-avatar").attr("src", data.avatar_url)
	$("#git-username").text(data.name)
	$("#git-bio").text(data.bio)
	$("#git-followers").text(data.followers)
	$("#git-following").text(data.following)
	$("#git-loc").text(data.location)
}

function getData(q){
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.github.com/users/" + q + "/repos",
		data: q,
		success: function(data){
			renderItem(data, repoTemplate);
		}
	});

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.github.com/users/" + q,
		data: q,
		success: function(data){
			renderProfile(data)
			$(".container").show()
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			$("#errorStatus").text(errorThrown)
			$(".error").toggle()
			setTimeout(function(){
				$(".error").fadeOut("slow");
			}, 3000)
		} 
	})
}

function eventListeners(){
	var searchForm = $("#search-form")
	var inputUser = $("#search-user")
	searchForm.on("submit", function(e){
		e.preventDefault()
		getData(inputUser.val())
	})
	$("#reset").on("click", function(e){
		window.location.reload()
	})
}

$(function(){
	eventListeners()
});